-- Copyright (C) 2021-2022  sirpdboy  <herboy2008@gmail.com> https://github.com/sirpdboy/luci-app-ddnsgo 
-- Licensed to the public under the Apache License 2.0.

module("luci.controller.ddnsgo", package.seeall)

function index()
	if not nixio.fs.access("/etc/config/ddnsgo") then
		return
	end

	entry({"admin", "services", "ddngo"}, cbi("ddnsgo"), _("DDNS-GO"), 58).dependent = true

	entry({"admin", "services", "status"}, call("ddnsgo_status"))
end

function ddnsgo_status()
	local sys  = require "luci.sys"
	local uci  = require "luci.model.uci".cursor()

	local status = {
		running = (sys.call("pidof ddns-go >/dev/null") == 0),
		port = 9876
	}

	luci.http.prepare_content("application/json")
	luci.http.write_json(status)
end
