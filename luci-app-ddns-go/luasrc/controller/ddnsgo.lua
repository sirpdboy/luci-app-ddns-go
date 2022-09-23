-- Copyright (C) 2021-2022  sirpdboy  <herboy2008@gmail.com> https://github.com/sirpdboy/luci-app-ddnsgo 
-- Licensed to the public under the Apache License 2.0.

module("luci.controller.ddnsgo", package.seeall)

function index()
	if not nixio.fs.access("/etc/config/ddns-go") then
		return
	end

	entry({"admin", "services", "ddnsgo"}, cbi("ddnsgo"), _("DDNS-GO"), 58).dependent = true

	entry({"admin", "services", "ddnsgo_status"}, call("ddnsgo_status"))
end

function ddnsgo_status()
	local sys  = require "luci.sys"
	local uci  = require "luci.model.uci".cursor()

	local e = { }
	e.running = luci.sys.call("pidof ddns-go >/dev/null") == 0
	e.port = uci:get("ddns-go","ddnsgo","port")
	luci.http.prepare_content("application/json")
	luci.http.write_json(e)
end
