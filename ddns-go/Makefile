# SPDX-License-Identifier: GPL-3.0-only
#
# Copyright (C) 2021-2026 sirpdboy  <herboy2008@gmail.com>
# 

include $(TOPDIR)/rules.mk

PKG_NAME:=ddns-go
PKG_VERSION:=6.16.2
PKG_RELEASE:=1

PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE
PKG_MAINTAINER:=sirpdboy <herboy2008@gmail.com>

include $(INCLUDE_DIR)/package.mk

ifeq ($(ARCH),aarch64)
	PKG_ARCH:=arm64
	PKG_HASH:=bf7e886a58ec9765a9e6a0b6aed01288f70caeb8a60983726878aed2272b03ba
else ifeq ($(ARCH),arm)
	PKG_ARCH:=armv7
	PKG_HASH:=5e7f405c9eb814fbca9cdedf6df27589acbe7bc53f5de8aa73d84f9de838d64c
else ifeq ($(ARCH),mipsel)
	PKG_ARCH:=mipsle
	PKG_HASH:=4cfb93ac191452940d8dfbe044490cef43b16e8a4ba08c91f3b2242fcff61036
else ifeq ($(ARCH),mips)
	PKG_ARCH:=mips
	PKG_HASH:=6e37759d749233de519ceb5413f458d0ef6fd0a3c3a331bfeededdad34aefae0
else ifeq ($(ARCH),i386)
	PKG_ARCH:=i386
	PKG_HASH:=133c79aec66030673af6d32666e4f6cf3f58756cc7f8c7983abc91b2bcfcdb31
else ifeq ($(ARCH),x86_64)
	PKG_ARCH:=x86_64
	PKG_HASH:=6600a5fcd366ff2b141b3377288b5c73ff60188f1a9ab2cc30cbb245df620d51
else ifeq ($(ARCH),riscv64)
	PKG_ARCH:=riscv64
	PKG_HASH:=ca9404f65fed0e296995e3792bb22b0c6483d349c19f3f47fc4b351202e1e77b
endif

PKG_SOURCE:=$(PKG_NAME)_$(PKG_VERSION)_linux_$(PKG_ARCH).tar.gz
PKG_SOURCE_URL:=https://github.com/jeessy2/ddns-go/releases/download/v$(PKG_VERSION)/
define Package/ddns-go
  SECTION:=net
  CATEGORY:=Network
  SUBMENU:=IP Addresses and Names
  TITLE:=Support IPV4 and IPV6 simple and easy-to-use IP binding domain name tool
  URL:=https://github.com/jeessy2/ddns-go
  DEPENDS:=+ca-bundle
  USERID:=ddns-go:ddns-go
endef

define Package/ddns-go/description
  A simple and easy-to-use IP binding domain name tool that supports IPV4 and IPV6.
endef

define Package/ddns-go/conffiles
/etc/config/ddns-go
/etc/ddns-go/ddns-go-config.yaml
endef


define Package/ddns-go/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_DIR) $(1)/etc/config
	tar -xzf $(DL_DIR)/$(PKG_SOURCE) -C $(PKG_BUILD_DIR)
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/ddns-go $(1)/usr/bin/
	echo "$(PKG_VERSION)" > $(1)/etc/ddns-go/version
	[ -f $(CURDIR)/files/ddns-go.init ] && $(INSTALL_BIN) $(CURDIR)/files/ddns-go.init $(1)/etc/init.d/ddns-go || true	
	[ -f $(CURDIR)/files/ddns-go.conf ] && $(INSTALL_CONF) $(CURDIR)/files/ddns-go.conf $(1)/etc/config/ddns-go || true	
endef

$(eval $(call BuildPackage,ddns-go))