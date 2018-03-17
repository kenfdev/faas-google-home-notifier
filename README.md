# Google Home Notifier Function

A [google-home-notifier](https://github.com/noelportugal/google-home-notifier) function for OpenFaaS.

## Prerequisites

* A Google Home
* Make sure the Google Home's IP can be reachable from the OpenFaaS cluster
  * Double check that you can ping from within the cluster to Google Home

## stack.yml

```yaml
functions:
  google-home-notifier:
    lang: node-with-ghn-deps # custom node template for google-home-notifier
    handler: ./google-home-notifier
    image: kenfdev/faas-google-home-notifier # be sure to change the username!
    environment:
      AVAHI_COMPAT_NOWARN: "1"
      # Edit this to the IP of your Google Home
      GOOGLEHOME_IP: "192.168.100.4"
```

## Build & Deploy

```bash
# build the function
faas build

# push the docker image if needed (be sure to change the prefix for the image!)
faas push

# deploy the function
faas deploy [--gateway <YOUR GATEWAY ADDRESS>]
```

## Sample Request

```bash
echo '{"message": "Hello"}' | faas invoke google-home-notifier --gateway 192.168.100.60:31112
*** WARNING *** The program 'node' called 'DNSServiceRegister()' which is not supported (or only supported partially) in the Apple Bonjour compatibility layer of Avahi.
*** WARNING *** Please fix your application to use the native API of Avahi!
*** WARNING *** For more information see <http://0pointer.de/avahi-compat?s=libdns_sd&e=node&f=DNSServiceRegister>
{"status":"ok"}
```

> Ignore the WARNING messages.


You can also use a `language` key to switch languages.

e.g. Japanese

```bash
echo '{"message": "こんにちは", "language":"ja"}' | faas invoke google-home-notifier --gateway 192.168.100.60:31112
```