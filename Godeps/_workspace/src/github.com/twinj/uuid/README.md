Go UUID implementation
========================

[![Build Status](https://travis-ci.org/twinj/uuid.png?branch=master)](https://travis-ci.org/twinj/uuid)
[![GoDoc](http://godoc.org/github.com/twinj/uuid?status.png)](http://godoc.org/github.com/twinj/uuid)

This package provides RFC 4122 compliant UUIDs.
It will generate the following:

* Version 1: based on timestamp and MAC address
* Version 3: based on MD5 hash
* Version 4: based on crytographically secure random numbers
* Version 5: based on SHA-1 hash

Functions NewV1, NewV3, NewV4, NewV5, New, NewHex and ParseUUID() for generating versions 3, 4
and 5 UUIDs are as specified in [RFC 4122](http://www.ietf.org/rfc/rfc4122.txt).

# Requirements

Go 1.2 and tip supported.

# Recent Changes to original work by nu7hatch

* Varient type bits are now set correctly
* Varient type can now be retrieved more efficiently
* New tests for variant setting to confirm correctness
* New tests added to confirm proper version setting
* Type UUID change to UUIDArray for V3-5 UUIDS and UUIDStruct added for V1 UUIDs
** These implement the BinaryMarshaller and BinaryUnmarshaller interfaces
* New was added to create a base UUID from a []byte slice - this uses UUIDArray
* ParseHex was renamed to ParseUUID
* NewHex now performs unsafe creation of UUID from a hex string
* NewV3 and NewV5 now take anything that implements the Stringer interface
* V1 UUIDs can now be created
* The printing format can be changed

## Installation

Use the `go` tool:

	$ go get github.com/twinj/uuid

## Usage

See [documentation and examples](http://godoc.org/github.com/twinj/uuid)
for more information.

## Copyright

This is a derivative work

Orginal version from
Copyright (C) 2011 by Krzysztof Kowalik <chris@nu7hat.ch>.
See [COPYING](https://github.com/nu7hatch/gouuid/tree/master/COPYING)
file for details.

Also see: Algorithm details in [RFC 4122](http://www.ietf.org/rfc/rfc4122.txt).

Copyright (C) 2014 twinj@github.com
See [LICENSE](https://github.com/twinj/uuid/tree/master/LICENSE)
file for details.
