// hid - Gopher Interface Devices (USB HID)
// Copyright (c) 2017 Péter Szilágyi. All rights reserved.
//
// This file is released under the 3-clause BSD license. Note however that Linux
// support depends on libusb, released under GNU LGPL 2.1 or later.

//go:build (!freebsd && !linux && !darwin && !windows) || ios || !cgo
// +build !freebsd,!linux,!darwin,!windows ios !cgo

package hid

// Supported returns whether this platform is supported by the HID library or not.
// The goal of this method is to allow programatically handling platforms that do
// not support USB HID and not having to fall back to build constraints.
func Supported() bool {
	return false
}

// Enumerate returns a list of all the HID devices attached to the system which
// match the vendor and product id. On platforms that this file implements the
// function is a noop and returns an empty list always.
func Enumerate(vendorID uint16, productID uint16) ([]DeviceInfo, error) {
	return nil, nil
}

// Open connects to an HID device by its path name. On platforms that this file
// implements the method just returns an error.
func (info DeviceInfo) Open() (Device, error) {
	return nil, ErrUnsupportedPlatform
}
