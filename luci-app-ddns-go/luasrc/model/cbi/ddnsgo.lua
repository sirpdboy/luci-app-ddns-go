local m, s

m = Map("ddns-go", translate("DDNS-GO"), translate("DDNS-GO automatically obtains your public IPv4 or IPv6 address and resolves it to the corresponding domain name service."))

m:section(SimpleSection).template  = "ddnsgo_status"

s = m:section(TypedSection, "ddnsgo", translate("Global Settings"))
s.addremove=false
s.anonymous=true

o=s:option(Flag,"enabled",translate("Enable"))
o.default=0

o=s:option(Value,"port",translate("Set the DDNS-TO access port"))
o.datatype="uinteger"
o.default=9876
o:depends("enabled",1)


local e=luci.http.formvalue("cbi.apply")
if e then
  io.popen("/etc/init.d/ddns-go restart")
end

return m
