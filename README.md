# Dashboard

[![CircleCI][shield-circleci]][circleci]
[![Docker Cloud Build Status][shield-docker]][docker]
[![Docker Image Size (latest)][shield-docker-image]][docker]
[![codecov][shield-codecov]][codecov]
[![Dependencies][shield-deps]][repo]
[![GitHub license][shield-license]][license]

![Alt text](/screenshot.png?raw=true "screenshot")

Dashboard is just that - a dashboard. It's inspired by [SUI](https://github.com/jeroenpardon/sui) and has all the same features as SUI, such as simple customization through JSON-files and a handy search bar to search the internet more efficiently.

## Features

So what makes this project different from (or even better than) SUI?

- "Display URL" functionality (The URL displayed for apps can differ from the actual URL)
- Categorization for apps
- Themes and search providers can be changed using JSON
- Imprint functionality

## Installation

The recommended way of installation is using [Docker](https://docker.com). You could also build your own version from source, but do proceed at your own risk.

### Docker

The Docker image is built on top of [this image](https://github.com/ratisbona-coding/nginx-cloudflare-cache), as it's based on Nginx and also provides functionality to purge the Cloudflare cache every time the container restarts (though this functionality is entirely optional).

1. Using the Docker CLI:

```sh
$ docker run -d \
  -e CLOUDFLARE_ZONE_ID=[OPTIONAL CLOUDFLARE V4 ZONE ID] \
  -e CLOUDFLARE_PURGE_TOKEN=[OPTIONAL CLOUDFLARE PURGE TOKEN] \
  -v $(pwd)/data:/app/data
  -p 8080:8080 \
  --name dashboard \
  phntxx/dashboard
```

2. Using Docker-Compose:

```yml
version: "3"

services:
  dashboard:
    image: phntxx/dashboard:latest
    restart: unless-stopped
    environment:
      - CLOUDFLARE_ZONE_ID=[OPTIONAL CLOUDFLARE V4 ZONE ID]
      - CLOUDFLARE_PURGE_TOKEN=[OPTIONAL CLOUDFLARE PURGE TOKEN]
    volumes:
      - [path to data directory]:/app/data
    ports:
      - 8080:8080
```

### Compile from source

I really don't anticipate people to use this, so go forth at your own risk.

```bash
$ git clone https://github.com/phntxx/dashboard.git
$ cd dashboard/
$ yarn
$ yarn build
$ yarn serve:production
```

### Manual install
```bash
$ git clone https://github.com/phntxx/dashboard.git
$ cd dashboard/
$ yarn
$ yarn build
$ cp -R build/* .
```

#### `/etc/nginx/conf.d/dashboard.conf`
```
server {
        server_name localhost;
        listen 8080;
        root /var/www/dashboard/html/;

        location / {
                index index.html index.htm;
        }
}
```

```bash
$ cd ..
$ mkdir /var/www/dashboard
$ mv dashboard/ html
$ mv html/ /var/www/dashboard
$ chown -R www-data:www-data
$ systemctl nginx reload
```



## Configuration

There's a couple of things you can / need to configure to get Dashboard to look and behave just as you want it to.

If you don't require a specific component, just remove the file from your `data`-directory. Dashboard won't render the components whose files are not present. With no files present, only the greeter will be shown.

If you're running into problems with configuring your files and you can't seem to get them to work, feel free to open an issue, I'd be happy to help! :smile:

### Apps

To show the apps you want to show, change `apps.json` to resemble the following:

```json
{
  "categories": [
    {
      "name": "[Name of the category]",
      "items": [
        {
          "name": "[Name of the app]",
          "displayURL": "[URL you want to show]",
          "url": "[URL to redirect to]",
          "icon": "[Icon code]"
        },
        ...
      ]
    },
    ...
  ],
  "apps": [
    {
      "name": "[Name of the app]",
      "displayURL": "[URL you want to show]",
      "url": "[URL to redirect to]",
      "icon": "[Icon code]"
    },
    ...
  ]
}
```

Wherein either `apps` or `categories` can be omitted as needed.

To find icons, simply go to the [Material Design Icon Library](https://material.io/icons/) and copy one of the codes for an icon there.

### Bookmarks

To show bookmarks, `bookmarks.json` needs to resemble the following:

```json
{
  "groups": [
    {
      "name": "[Group Name]",
      "items": [
        {
          "name": "[Bookmark Name]",
          "url": "[Bookmark URL]"
        },
        ...
      ]
    },
    ...
  ]
}
```

### Themes

In order to customize theming, `themes.json` needs to resemble this:

```json
{
  "themes": [
    {
      "label": "[Theme Name]",
      "value": "[Number of the theme]",
      "mainColor": "[Main Color as 6-character hex code]",
      "accentColor": "[Accent Color as 6-character hex code]",
      "backgroundColor": "[Background Color as 6-character hex code]"
    },
    ...
  ]
}
```

### Search Providers

For search providers to work, make sure your `search.json` resembles the following:

```json
{
  "providers": [
    {
      "name": "[Name of the website]",
      "url": "[Link that processes searches on that website]",
      "prefix": "[A custom prefix (e.g. '/test')]"
    },
    ...
  ]
}
```

### Imprint

In order for the imprint-modal to show up, make sure your `imprint.json` resembles the following:

```json
{
  "imprint": {
    "name": {
      "text": "[Name]",
      "link": "[Link to the name (to e.g. a portfolio)]"
    },
    "address": {
      "text": "[Address]",
      "link": "[Link for the address (to e.g. Google Maps)]"
    },
    "phone": {
      "text": "[Phone number]",
      "link": "[Link for the phone number]"
    },
    "email": {
      "text": "[Email address]",
      "link": "[Link for the email address (e.g. for 'mailto')]"
    },
    "url": {
      "text": "[URL]",
      "link": "[Link for the URL]"
    },
    "text": "[Text for the imprint]"
  }
}
```

> :exclamation: I haven't quite tested this. I'm not a lawyer and I'm not responsible if you're sued for using this incorrectly.

[docker]: https://hub.docker.com/r/phntxx/dashboard
[codecov]: https://codecov.io/gh/phntxx/dashboard
[repo]: https://github.com/phntxx/dashboard
[license]: https://github.com/phntxx/dashboard/LICENSE
[circleci]: https://circleci.com/gh/phntxx/dashboard
[shield-docker]: https://img.shields.io/docker/cloud/build/phntxx/dashboard
[shield-docker-image]: https://img.shields.io/docker/image-size/phntxx/dashboard/latest
[shield-circleci]: https://circleci.com/gh/phntxx/dashboard.svg?style=shield
[shield-codecov]: https://codecov.io/gh/phntxx/dashboard/branch/master/graph/badge.svg
[shield-license]: https://img.shields.io/github/license/phntxx/dashboard.svg
[shield-deps]: https://img.shields.io/david/phntxx/dashboard
