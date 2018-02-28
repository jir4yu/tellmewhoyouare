const sharp = require('sharp');
const async = require('async');
const readline = require('readline');
const chalk = require('chalk');

const rawImage = sharp('./files/source.jpg');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

/**
 * Init the default rows and columns
 */
let rows = 3;
let columns = 3;

/**
 * Read row and column number from user console
 * then set to rows and columns variables
 */
async.series(
	[
		callback => {
			rl.question(
				chalk.yellowBright.bold('how many rows you want to slice? '),
				rowNumber => {
					rows = rowNumber;
					callback();
				}
			);
		},
		callback => {
			rl.question(
				chalk.yellowBright.bold('how many columns you want to slice? '),
				colNumber => {
					columns = colNumber;
					callback();
				}
			);
		}
	],
	() => {
		rl.close();
		/**
		 * Starting manipulating image
		 */
		rawImage.metadata().then(function(metadata) {
			/**
			 * Get basic of image information
			 * such as width and height
			 */
			let w = metadata.width;
			let h = metadata.height;

			/**
			 * Defined the first x,y positioning
			 * this variables will use for slice image.
			 */
			let x = 0;
			let y = 0;

			/**
			 * Create new array with length of rowsxcolumns
			 */
			let boxCount = Array.apply(null, { length: rows * columns }).map(
				Number.call,
				Number
			);

			/**
			 * Loop within array from the first one to the last
			 * - find box-width and box-height by image width / rows and columns
			 * - slice into new image start with x as left and y as top position
			 * - save image into destination folder and arrange file name by index 
			 */
			boxCount.forEach(function(index) {
				index++;
				let img = rawImage;
				let boxW = Math.floor(w / rows);
				let boxH = Math.floor(h / columns);
				let sliceImg = img
					.extract({
						left: x * boxW,
						top: y * boxH,
						width: boxW,
						height: boxH
					})
					.toFile(`./files/guest-${index}.jpg`, function(err, info) {
						if (err) throw err;
					});
				if (index % rows === 0) {
					x = 0;
					y++;
				} else {
					x++;
				}
			});
		});
		/**
		 * Log to console, to let user know process was done.
		 */
		console.log(
			chalk.greenBright.bold(`Yey! image was sliced to ${rows}x${columns} shots 🎉 `)
		);
	}
);
