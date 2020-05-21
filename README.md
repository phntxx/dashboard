# Dashboard

![screenshot](screenshot.png 'screenshot')

Dashboard is just that - a dashboard. It's inspired by [SUI](https://github.com/jeroenpardon/sui) and has all the same features as SUI, such as simple customization through JSON-files and a handy search bar to search the internet more efficiently.

## Features

So what makes this thing better than SUI?

-   "Display URL" functionality, in case the URL you want to show is different than the URL you want to be redirected to
-   Theming through JSON
-   Search providers customizable through JSON (SUI has them both in a JSON and hardcoded)

## Installation

Getting Dashboard to run is fairly simple and can be accomplished with two techniques:

1. Locally

**Prerequisites: node, npm, yarn**

To get Dashboard to run, just clone the repository, download the dependencies using yarn, then start using `yarn start`.

```
git clone https://github.com/phntxx/dashboard.git
cd dashboard
yarn
yarn build
yarn serve:production
```

alternatively, if you want to work using static files (requires a rebuild for
every change in the JSON-files), just replace `yarn start` with `yarn build`.
Then you can copy the files inside the `build` directory onto the webroot of
your webserver of choice.

2. Using Docker

Using Docker requires building the container manually. Fortunately, this can be accomplished fairly easily:

```
git clone https://github.com/phntxx/dashboard.git
cd dashboard
docker build -t dashboard:1.0

docker run -d \
-t \
-p 3000:3000 \
-v ./src/components/data:/app/src/components/data \
dashboard:1.0
```

**NOTE: The `-t` flag is very important, as the Dockerfile requires standard TTY.**

## Customization

Dashboard is designed to be customizable. Everything is handled using four .json-files, which can be found at /src/components/data

### Applications

To add an application, append the following to applications.json or simply edit one of the examples given.

```
{
	"name": "[Name of the Application]",
	"displayURL": "[URL you want to show]",
	"URL": "[URL to redirect to]",
	"icon": "[Icon code]"
}
...
```

To find icons, simply go to the [Material Design Icon Library](https://material.io/icons/) and copy one of the codes for an icon there.

### Bookmarks

To add an bookmark, append the following to bookmarks.json or simply edit one of the examples given.

```
{
	"name": "[Category name]",
	"items": [
		{
		"name": "[Bookmark name]",
		"url": "[URL to redirect to]"
		},
		{
		"name": "[Bookmark name]",
		"url": "[URL to redirect to]"
		},
		{
		"name": "[Bookmark name]",
		"url": "[URL to redirect to]"
		}
		...
	]
},
...
```

### Theming:

Dashboard also supports themes with the help of a simple JSON-file: themes.json. To add a theme, append the following to themes.json:

```
{
	"label": "[Theme Name]",
	"value": [Number of the theme],
	"mainColor": "[Main Color as 6-character hex code]",
	"accentColor": "[Accent Color as 6-character hex code]",
	"backgroundColor": "[Background Color as 6-character hex code]"
}
```

### Search Providers:

The searchbar on the top supports shortcuts like "/so", just as SUI does. To add one of your own, simply append the following to search.json

```
{
	"name":"[Name of the website]",
	"url":"[Link that processes searches on that website]",
	"prefix":"[a custom prefix]"
},
```
