local m, s

m = Map("ddnsgo", translate("DDNS-GO"), translate("DDNS-GO automatically obtains your public IPv4 or IPv6 address and resolves it to the corresponding domain name service."))

m:section(SimpleSection).template  = "ddnsgo_status"

s = m:section(TypedSection, "ddnsgo", translate("Global Settings"))
s.addremove=false
s.anonymous=true

s:option(Flag, "enabled", translate("Enable")).rmempty=false


return m


