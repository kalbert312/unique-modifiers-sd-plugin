const gulp = require("gulp");
const del = require("del");
const execSync = require("child_process").execSync;
const os = require("os");
const replace = require("gulp-replace");
const fs = require("fs");

const isMac = os.platform() === "darwin";
const pluginName = "com.github.kalbert312.unique-modifiers";
const craDestPath = `./Sources/${pluginName}.sdPlugin/propertyinspector`;

const execCmd = (cmd, opts) => {
	if (!Array.isArray(cmd)) {
		cmd = [cmd];
	}
	for (let i = 0; i < cmd.length; i++) {
		execSync(cmd[i], { stdio: "inherit", ...(opts || {}) });
	}
};

// clean
gulp.task("clean:plugin", async () => del(["Release/*.streamDeckPlugin"]));

gulp.task("clean:dev", async () => {
	if (isMac) {
		return del([`~/Library/Application\\ Support/com.elgato.StreamDeck/Plugins/${pluginName}.sdPlugin`]);
	}
});

// debugging
gulp.task("debug:enable", async () => {
	if (isMac) { //language=sh
		execCmd("defaults write com.elgato.StreamDeck html_remote_debugging_enabled -bool YES");
	}
});

gulp.task("debug:disable", async () => {
	if (isMac) { //language=sh
		execCmd("defaults write com.elgato.StreamDeck html_remote_debugging_enabled -bool NO");
	}
});

gulp.task("debug:open", async () => {
	if (isMac) {
		//language=sh
		execCmd(`open -a "Google Chrome" "http://localhost:23654/"`);
	}
});

// install
gulp.task("install:cra", async () => execCmd(/*language=sh*/ "npm install", { cwd: "./Sources/cra" }));

// dev build
gulp.task("build:dev:dist",
	gulp.series(
		() => del("./Release/*.streamDeckPlugin"),
		(cb) => {
			if (!isMac) {
				return;
			}
			if (!fs.existsSync(`${craDestPath}/index.html`)) {
				throw new Error(`File does not exist: ${craDestPath}/index.html`);
			}
			//language=sh
			try {
				execCmd(`DistributionTool -b -i Sources/${pluginName}.sdPlugin -o ./Release/`);
			} catch (e) {
				console.log(`DistributionTool: ${JSON.stringify(e)}`);
			}
			cb();
		}
	)
);

gulp.task("build:dev:cra", async () => execCmd("npm run build", { cwd: "./Sources/cra" }));

gulp.task(
	"build:dev:cra-copy",
	gulp.series(
		() => del(`${craDestPath}/**`),
		() => gulp.src("./Sources/cra/build/**").pipe(gulp.dest(craDestPath)),
		() => gulp.src(`${craDestPath}/index.html`, { allowEmpty: true })
			.pipe(replace(`"/static/`, `"./static/`))
			.pipe(gulp.dest(`${craDestPath}`))
	)
);

// dev deploy

gulp.task("deploy:dev:deck-kill", async () => {
	if (isMac) {
		//language=sh
		try {
			execCmd(`killall "Stream Deck"`);
		} catch (e) {
			console.warn(`Failed to kill Stream Deck. It may not be running. ${JSON.stringify(e)}`);
		}
	}
});

gulp.task("deploy:dev:deck-install-plugin", async () => {
	if (isMac) {
		//language=sh
		execCmd([
			`rm -rf ~/Library/Application\\ Support/com.elgato.StreamDeck/Plugins/${pluginName}.sdPlugin`,
			`open -a "Stream Deck" ./Release/${pluginName}.streamDeckPlugin`
		]);
	}
});
gulp.task("deploy:dev:deck", gulp.series("deploy:dev:deck-kill", "deploy:dev:deck-install-plugin"));

// main tasks
gulp.task("clean", gulp.series("clean:plugin"));
gulp.task("build:dev", gulp.series("clean:plugin", "build:dev:cra", "build:dev:cra-copy", "build:dev:dist"));
gulp.task("deploy:dev", gulp.series("clean:dev", "build:dev", "debug:enable", "deploy:dev:deck", "debug:open"));






