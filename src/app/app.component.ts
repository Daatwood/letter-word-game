import { Component, OnInit } from '@angular/core';

import { VALID_WORDS } from './mock-dictionary';

const LETTERS: Letter[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Letter Words';
  letters = LETTERS;
  words = [];
  points = 0;
  message: String;

  // On initilize get a list oh heroes from our own method.
  ngOnInit(): void {
    this.generateLetterCollection();
  };

  generateLetterCollection(): void {
    for(var i = 65; i < 65+26; i++){
      LETTERS.push({amount: 0, char: String.fromCharCode(i)})
    }
  }

  generateLetter(): void {
    // TODO Choose a random letter in the collection and increase by 1
    let char = String.fromCharCode( 65 + ~~(Math.random() * 26) );

    let found = false;
    LETTERS.forEach(function(letter) {
      if(letter.char === char){
        letter.amount ++;
        found = true;
      }
    });

    if(!found){
      LETTERS.push({amount: 1, char: char})
    }
    this.print("Added letter '"+ char +"'");
  };

  addWord(word): void{
    word = word.toUpperCase()
    // Strip out whitespace
    word = word.replace(' ', '')

    // Validate the word is at least 3 characters
    if (!word || word.length < 3){
      this.print("Must be atleast 3 characters");
      return;
    }

    // Breakdown the word into letters array
    var letters = [];
    for(var x = 0, length = word.length; x < length; x++) {
      var l = word.charAt(x)
      letters[l] = (isNaN(letters[l]) ? 1 : letters[l] += 1)
    }
    var missingLetters = [];
    // Ensure all letters for word are present
    LETTERS.forEach(function(letter) {
      if(letters[letter.char] != null) {
        if (letters[letter.char] > letter.amount){
          missingLetters.push({char: letter.char, amount: letters[letter.char] - letter.amount})
        }
      }
    });

    // if not all letters are found; error and exit
    if (missingLetters.length) {
      // Form error string...
      var str = missingLetters.map(function(x) {
        return x.char+"("+x.amount+")"
      })
      this.print("Missing Letters: " + str);
      return;
    }

    if(!VALID_WORDS.includes(word.toLowerCase())) {
      this.print(word + " is not a valid word.")
      return;
    }

    // Decrease the letter count
    LETTERS.forEach(function(letter) {
      if(word.includes(letter.char)){
        letter.amount -= letters[letter.char];
      }
    });

    var points = this.fibonacci(word.length)
    this.words.push(word);
    this.points += points;
    this.print("Added "+word+" for "+ points+" points.")
  }

  fibonacci(n): number{
    var array = [0, 1];
    for (var i = 2; i <= n; i++) {
        array.push(array[i - 1] + array[i - 2]);
    }
    return array[n];
  }

  print(message): void {
    this.message = message
    //console.log(message)
  }
}

export class Letter {
  char: string;
  amount: number;
}
