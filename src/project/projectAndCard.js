class CardObj {
    constructor(title, image, type, text) {
      this.title = title;
      this.image = image;
      this.type = type;
      this.text = text;
    }

    setTitle(newTitle){
      this.title = newTitle;
    }
    setImage(newImage){
      this.image = newImage;
    }
    setType(newType){
      this.type = newType;
    }
    setText(newText){
      this.text = newText;
    }
}

class ProjectObj {
  cardList = [];
  constructor(title, cards) {
    this.title = title;
    this.cardList = cards;
  }

  setTitle(newTitle){
    this.title = newTitle;
  }

  addCard(card){
    this.cardList.push(card);
  }

  removeCard(card) {
    this.cardList.filter((c) => c !== card);
  }
}