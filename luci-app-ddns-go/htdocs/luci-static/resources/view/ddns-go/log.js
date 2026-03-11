// SPDX-License-Identifier: Apache-2.0
/*
 * Copyright (C) 2022-2026 sirpdboy <herboy2008@gmail.com>
 */
'use strict';
'require dom';
'require fs';
'require poll';
'require uci';
'require view';
'require form';

return view.extend({
	render: function () {
		var css = `
			#log_textarea pre {
				padding: 10px;
				border-bottom: 1px solid #ddd;
				font-size: small;
				line-height: 1.3;
				white-space: pre-wrap;
				word-wrap: break-word;
				overflow-y: auto;
			}
			.cbi-section small {
				margin-left: 1rem;
				font-size: small; 
			}
			.log-container {
				display: flex;
				flex-direction: column;
				max-height: 1200px;
				overflow-y: auto;
				border-radius: 3px;
				margin-top: 10px;
				padding: 5px;
				background-color: var(--background-color);
				font-family: monospace;
				font-size: 12px;
				border: 1px solid var(--border-color);
			}
			.log-line {
				padding: 3px 5px;
				font-family: monospace;
				font-size: 12px;
				line-height: 1.4;
				border-bottom: 1px solid var(--border-color-light);
				white-space: pre-wrap;
				word-break: break-all;
			}
			.log-line:last-child {
				border-bottom: none;
			}
			.log-timestamp {
				color: #0066cc;
				margin-right: 10px;
				font-weight: bold;
			}
			.log-error {
				color: #cc0000;
			}
			.log-warning {
				color: #ff9900;
			}
			.control-buttons {
				margin-bottom: 10px;
				display: flex;
				gap: 5px;
			}
			.debug-info {
				margin-top: 5px;
				color: #666;
				font-size: 11px;
			}
		`;

		var log_container = E('div', { 'class': 'log-container', 'id': 'log_container' },
			E('img', {
				'src': L.resource(['icons/loading.gif']),
				'alt': _('Loading...'),
				'style': 'vertical-align:middle'
			}, _('Collecting data ...'))
		);

		var lastLogContent = '';
		var lastScrollTop = 0;
		var isScrolledToTop = true;

		function extractDDNSGoMessage(line) {
			if (!line || !line.includes('ddns-go')) return null;
			
			var regex = /^.*?ddns-go\[\d+\]:\s*(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2})\s*(.*)$/;
			var match = line.match(regex);
			
			if (match) {
				return {
					timestamp: match[1],
					message: match[2]
				};
			}
			
			return {
				timestamp: null,
				message: line
			};
		}

		function formatLogLine(line) {
			if (!line || line.trim() === '') return null;
			
			var extracted = extractDDNSGoMessage(line);
			if (!extracted) return null;
			var lineClass = ['log-line'];
			
			if (line.includes('err') || line.includes('ERROR')) {
				lineClass.push('log-error');
			} else if (line.includes('warn') || line.includes('WARNING')) {
				lineClass.push('log-warning');
			}
			
			if (extracted.timestamp) {
				var timestampSpan = E('span', { 
					'class': 'log-timestamp',
					'title': extracted.timestamp
				}, extracted.timestamp + ' ');
				
				var messageSpan = E('span', { 'class': 'log-message' }, extracted.message);
				
				return E('div', { 'class': lineClass.join(' ') }, [timestampSpan, messageSpan]);
			} else {
				return E('div', { 'class': lineClass.join(' ') }, extracted.message);
			}
		}

		function formatLogContent(logContent) {
			if (!logContent || logContent.trim() === '') {
				return E('div', { 'class': 'log-line' }, _('No ddns-go logs found.'));
			}
			
			var lines = logContent.split('\n');
			var formattedLines = [];
			
			for (var i = 0; i < lines.length; i++) {
				var line = lines[i].trim();
				if (line === '') continue;
				
				var formattedLine = formatLogLine(line);
				if (formattedLine) {
					formattedLines.push(formattedLine);
				}
			}
			
			if (formattedLines.length === 0) {
				return E('div', { 'class': 'log-line' }, _('No ddns-go logs found.'));
			}
			
			formattedLines.reverse();
			
			return E('div', {}, formattedLines);
		}

		function clearLogs(button) {
			button.disabled = true;
			button.textContent = _('Clear Logs');
			
			fs.exec('/usr/libexec/ddns-go-call', ['clear_logs'])
				.then(function(res) {
					button.textContent = _('Logs cleared!');
					lastLogContent = '';
					
					return fetchLogs();
				})
				.then(function() {
					setTimeout(function() {
						button.disabled = false;
						button.textContent = _('Clear Logs');
					}, 2000);
				})
				.catch(function(err) {
					button.textContent = _('Failed: ') + (err.message || 'Unknown error');
					setTimeout(function() {
						button.disabled = false;
						button.textContent = _('Clear Logs');
					}, 3000);
				});
		}

		function fetchLogs() {
			return fs.exec('/usr/libexec/ddns-go-call', ['get_logs'])
				.then(function(res) {
					var logContent = '';
					if (res && typeof res === 'object') {
						logContent = res.stdout || res.data || '';
					} else if (typeof res === 'string') {
						logContent = res;
					}
					var lineCount = logContent.split('\n').filter(function(l) { 
						return l.trim() !== '' && !l.includes('No ddns-go logs found'); 
					}).length;
					
					if (logContent !== lastLogContent) {
						var formattedLog = formatLogContent(logContent);
						
						var prevScrollHeight = log_container.scrollHeight;
						var prevScrollTop = log_container.scrollTop;
						
						dom.content(log_container, formattedLog);
						lastLogContent = logContent;
						
						if (!isScrolledToTop) {
							var newScrollHeight = log_container.scrollHeight;
							var heightDiff = newScrollHeight - prevScrollHeight;
							log_container.scrollTop = prevScrollTop + heightDiff;
						}
					}
					
					return Promise.resolve();
				})
				.catch(function(err) {
					console.error('Log fetch error:', err);
					var errorMsg = _('Failed to read logs: %s').format(err.message || 'Resource not found');
					dom.content(log_container, E('div', { 'class': 'log-line log-error' }, errorMsg));
					return Promise.reject(err);
				});
		}

		var clear_button = E('button', {
			'class': 'cbi-button cbi-button-remove',
			'click': function(ev) {
				ev.preventDefault();
				clearLogs(ev.target);
			}
		}, _('Clear Logs'));


		log_container.addEventListener('scroll', function() {
			lastScrollTop = this.scrollTop;
			isScrolledToTop = this.scrollTop <= 1;
		});

		setTimeout(function() {
			fetchLogs().catch(function(err) {
				console.error('Initial fetch error:', err);
			});
		}, 100);

		poll.add(L.bind(function() {
			return fetchLogs().catch(function(err) {
				console.error('Poll error:', err);
			});
		}));

		poll.start();

		return E('div', { 'class': 'cbi-map' }, [
			E('style', [css]),
			E('div', { 'class': 'cbi-section' }, [
				E('div', { 'class': 'control-buttons' }, [clear_button]),
				log_container,
				E('small', {}, [
					_('Refresh every 5 seconds.').format(L.env.pollinterval),

				])
			])
		]);
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});