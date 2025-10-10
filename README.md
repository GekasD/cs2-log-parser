# cs2-log-parser

A simple 0-dependency library that parses logs from a CS2 server into JavaScript objects, originally based on this fork by [BLAST](https://github.com/blastorg) (available [here](https://github.com/blastorg/srcds-log-parser)), and the original library made by [negezor](https://github.com/negezor) (available [here](https://github.com/negezor/srcds)).
These libraries however have not been updated in a while, which is the reason for making this one, which has been cleaned up & updated to the latest CS2 logging formats, with some new log parsers added.

For a list of the logs this library supports look inside the [tests](/tests/) directory.

## Install

```bash
npm i cs2-log-parser
```

## Usage

### HTTP

CS2 supports sending logs over HTTP POST requests by giving it an address using `logaddress_add_http`.  
Here is a simple example using [tinyhttp](https://github.com/tinyhttp/tinyhttp) and [milliparsec](https://github.com/tinyhttp/milliparsec) on how we can handle these on our server:

```js
import { App } from "@tinyhttp/app";
import { text } from "milliparsec";
import { StatusCodes } from "http-status-codes";
import parse from "cs2-log-parser";

const app = new App();

app.post("/cs2_logs", text(), (req, res) => {

	const logLines = req.body.split("\n");

	for (const logLine of logLines) {

		const event = parse(logLine, { format: "http" });

		if (event === null) {
			continue;
		}

		console.log(event);
		
	}

	res.sendStatus(StatusCodes.OK);

});

app.listen(3000);
```

### Log file

CS2 can write logs to a text file by setting `sv_logfile 1`, saved in a directory specified by `sv_logsdir` (defaults to `logs` inside the `game/csgo` folder).  
Here is a simple example on how we can read these using Node's built-in `fs` & `path` modules:

```js
import fs from "fs";
import path from "path";
import parse from "cs2-log-parser";

const logFilePath = path.join(
  "C:",
  "Program Files (x86)",
  "Steam",
  "steamapps",
  "common",
  "Counter-Strike Global Offensive",
  "game",
  "csgo",
  "logs",
  "2025_10_08_214757.log"
);

const logFileData = fs.readFileSync(logFilePath, "utf-8");

const logLines = logFileData.split("\n");

for (const logLine of logLines) {

    // Log file lines begin with "L" & contain whitespace, we clean them up here
    const cleanLogLine = logLine.slice(1).trim();

    const event = parse(cleanLogLine, { format: "file" });

    if (!event) {
        continue;
    }

    console.log(event);
    
}
```

## Note

Some logs require additional ConVars to be set on the server in order to get logged, specifically:

- `attacked` needs `mp_logdetail` set to either `1` (to log enemy attacks), `2` (to log team attacks) or `3` (to log both).
- `picked_up` needs `mp_logdetail_items` set to `true` (or `1`). 