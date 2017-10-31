const ignoreList = ['input', 'textarea', 'select'];

const WordListener = function ({ word, callback } = {}) {
	if (typeof word !== 'string' || typeof callback !== 'function') {
		throw new Error('Required an object to be passed with these properties: word (string) and callback (function)');
	}

	this.word = word;
	this.callback = callback;
	this.index = 0;
	this.listener = ({ key, target }) => {
		const shouldIgnoreKey = ignoreList.includes(target.tagName.toLowerCase());

		if (shouldIgnoreKey) {
			this.index = 0;
			return;
		}

		const keyWasNextExpectedCharacter = key === this.word[this.index];

		if (keyWasNextExpectedCharacter) {
			this.index++;
		} else {
			this.index = 0;
		}

		const fullWordReceived = this.index === this.word.length;

		if (fullWordReceived) {
			this.callback();
			this.index = 0;
		}
	};

	document.addEventListener('keyup', this.listener);
};

WordListener.prototype.stopListening = function () {
	document.removeEventListener('keyup', this.listener);
};

export default WordListener;
