# SPDX-License-Identifier: GPL-3.0-only
#
# Copyright (C) 2021-2022  sirpdboy  <herboy2008@gmail.com> https://github.com/sirpdboy/luci-app-ddns-go 
# 
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

PKG_NAME:=ddns-go
PKG_VERSION:=4.0.4
PKG_RELEASE:=$(AUTORELEASE)

PKG_LICENSE:=GPL-3.0
PKG_LICENSE_FILE:=LICENSE
PKG_MAINTAINER:=sirpdboy <herboy2008@gmail.com>
include $(INCLUDE_DIR)/package.mk

define Package/ddns-go
  SECTION:=multimedia
  CATEGORY:=Multimedia
  DEPENDS:=@(aarch64||arm||i386||mips||mipsel||x86_64)
  TITLE:=A plug-in DDNS-GO for luci-app-ddns-go by sirpdboy
  URL:=https://github.com/sirpdboy/luci-app-ddns-go
endef

define Build/Compile
endef

define Package/ddns-go/install
	$(INSTALL_DIR) $(1)/usr/share/ddns-go
	$(INSTALL_DATA)) ./file/ddns-go-default.yaml $(1)/usr/share/ddns-go
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./file/ddns-go.init $(1)/etc/init.d/ddns-go
	$(INSTALL_DIR) $(1)/usr/bin
ifeq ($(ARCH),aarch64)
	$(INSTALL_BIN) ./file/aarch64 $(1)/usr/bin/ddns-go
else ifeq ($(ARCH),arm)
	$(INSTALL_BIN) ./file/arm $(1)/usr/bin/ddns-go
else ifeq ($(ARCH),i386)
	$(INSTALL_BIN) ./file/i386 $(1)/usr/bin/ddns-go
else ifeq ($(ARCH),mips)
	$(INSTALL_BIN) ./file/mips $(1)/usr/bin/ddns-go
else ifeq ($(ARCH),mipsel)
	$(INSTALL_BIN) ./file/mipsel $(1)/usr/bin/ddns-go
else ifeq ($(ARCH),x86_64)
	$(INSTALL_BIN) ./file/x86_64 $(1)/usr/bin/ddns-go
endif
endef

$(eval $(call BuildPackage,ddns-go))
