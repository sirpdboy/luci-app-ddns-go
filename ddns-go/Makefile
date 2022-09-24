# SPDX-License-Identifier: GPL-3.0-only
#
# Copyright (C) 2021-2022  sirpdboy  <herboy2008@gmail.com> https://github.com/sirpdboy/luci-app-ddnsgo 
# 
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

PKG_ARCH:=$(ARCH)
PKG_NAME:=ddns-go
PKG_VERSION:=4.0.4
PKG_RELEASE:=$(PKG_ARCH)-1

PKG_LICENSE:=GPL-3.0
PKG_LICENSE_FILE:=LICENSE
PKG_MAINTAINER:=sirpdboy <herboy2008@gmail.com>
include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
SECTION:=net
CATEGORY:=Network
  DEPENDS:=@(aarch64||arm||i386||mips||mipsel||x86_64)
  TITLE:=A plug-in DDNS-GO for luci-app-ddns-go by sirpdboy
  URL:=https://github.com/sirpdboy/luci-app-ddns-go
endef

define Package/$(PKG_NAME)/conffiles
/etc/config/ddns-go
endef
define Package/$(PKG_NAME)/postinst
#!/bin/sh
if [ -z "$${IPKG_INSTROOT}" ]; then
	[ -f /etc/uci-defaults/luci-ddns-go ] && /etc/uci-defaults/luci-ddns-go && rm -f /etc/uci-defaults/luci-ddns-go
fi
endef
define Build/Compile
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/share/ddns-go $(1)/usr/bin $(1)/etc/config $(1)/etc/init.d $(1)/etc/uci-defaults
	$(INSTALL_CONF)) ./file/ddnsgo-default.yaml $(1)/usr/share/ddns-go/ddnsgo-default.yaml
	$(INSTALL_BIN) ./file/$(PKG_ARCH)  $(1)/usr/bin/ddns-go
	$(INSTALL_BIN) ./file/ddnsgo.init $(1)/etc/init.d/ddnsgo
	$(INSTALL_CONF) ./file/ddnsgo.config $(1)/etc/config/ddnsgo
	$(INSTALL_BIN) ./file/luci-ddns-go.uci-default $(1)/etc/uci-defaults/luci-ddns-go

endef

$(eval $(call BuildPackage,$(PKG_NAME)))
