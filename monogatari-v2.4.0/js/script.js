/* global monogatari */


// Define the messages used in the game.
monogatari.action('message').messages({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	}
});

// Define the notifications used in the game
monogatari.action('notification').notifications({
	'Welcome': {
		title: 'Welcome',
		body: 'This is the Monogatari VN Engine',
		icon: ''
	}
});

// Define the Particles JS Configurations used in the game
monogatari.action('particles').particles({

});

// Define the canvas objects used in the game
monogatari.action('canvas').objects({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration('credits', {

});


// Define the images that will be available on your game's image gallery
monogatari.assets('gallery', {

});

// Define the music used in the game.
monogatari.assets('music', {

});

// Define the voice files used in the game.
monogatari.assets('voices', {

});

// Define the sounds used in the game.
monogatari.assets('sounds', {

});

// Define the videos used in the game.
monogatari.assets('videos', {

});

// Define the images used in the game.
monogatari.assets('images', {

});

// Define the backgrounds for each scene.
monogatari.assets('scenes', {

});


// Define the Characters
/*initial characters, then the iframe parent updates them before dynamically generating the script;
monogatari.characters ({
	'y': {
		name: 'Yui',
		color: '#5bcaff'
	}
});
*/
//this is the dynamically generated characters object that is added by the parent with: `monogatari.characters(monogatariCharacters)` this happens on runtime once the iframe has told the parent it is ready;
monogatari.characters({
	"y": {
		"name": "Yui",
		"color": "#5bcaff"
	},
	"Harrison": {
		"name": "Harrison",
		"color": "red",
		"sprites": {
			"normal": "test-ai-writing.s3.ap-southeast-2.amazonaws.com/users/epwiYLy73PNejBfvKn6LTJWtEKu1/images/1743129169920_t6j9dozk.png",
			"peace": "test-ai-writing.s3.ap-southeast-2.amazonaws.com/users/epwiYLy73PNejBfvKn6LTJWtEKu1/images/1743129182725_ki5gk5q3.png",
			"determined": "test-ai-writing.s3.ap-southeast-2.amazonaws.com/users/epwiYLy73PNejBfvKn6LTJWtEKu1/images/1743129196382_yocaaq7o.png",
			"thinking": "test-ai-writing.s3.ap-southeast-2.amazonaws.com/users/epwiYLy73PNejBfvKn6LTJWtEKu1/images/1743129206616_cn1fegoc.png"
		}
	},
	"Yui": {
		"name": "Yui",
		"color": "#00bfff",
		"sprites": {
			"normal": "test-ai-writing.s3.ap-southeast-2.amazonaws.com/users/epwiYLy73PNejBfvKn6LTJWtEKu1/images/1743129148565_6vg6n5oo.png"
		}
	}
});

/*initial script, then iframe parent updates it with dynamically generated script;
monogatari.script ({
	// The game starts here.
	'1': [
		'show scene #f7f7f7',
		'centered Loading...',
	],	
});
*/

//this is the dynamically generated script, added with: `monogatari.script({ ...monogatariScript })` - script is generated once the iframe tells the parent it is ready - it parses a bunch of data to output a Monogatari compatible script :)
//the script is updated after the characters are updated;
//once the script is updated on runtime, we don't touch Monogatari anymore, and we treat it as being ready to play.
monogatari.script({
	//label 1 shows the issue when reversing back from label 2 and hitting "show character...";
	"1": [
		"show background url(\"https://test-ai-writing.s3.ap-southeast-2.amazonaws.com/users/epwiYLy73PNejBfvKn6LTJWtEKu1/images/1743114317150_vhj2j3c6.jpg\")",
		"clear",
		"nvl <p style=\"text-align: left\"> Link test <span data-action=\"jump\" data-jump=\"2\" style=\"text-decoration: underline;\" >Go to south the bar</span></p><p></p>",
		"Harrison <p> Dialog 1 test</p><p></p>",
		"show character Harrison peace right",//here is where the error is thrown when reversing back through history;
		"Harrison <p> Peace!</p><p></p>",
		{
			"Choice": {
				"Choice_2": { "Text": "Go south to The Bar", "Do": "jump 2" },
			}
		}
	],
	"2": [
		"clear",
		"show background url(\"https://test-ai-writing.s3.ap-southeast-2.amazonaws.com/users/epwiYLy73PNejBfvKn6LTJWtEKu1/images/1743114338436_05ljenyg.jpg\") with fadeIn duration 5s",
		"nvl <p> Now that you've hit the second label, you can press the back button to go back in history to see the bug. Attempting to reverse back to the 'show character' command throws an error (after Harrison says 'Peace!')</p><p></p>",
		"Harrison <p> If you contine past here, the game will end!</p>",
		"end"
	]
	//more is generated after this, but not necessary to demonstrate the issue;
});

