// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (speciminNum, dna) => {
  return {
    speciminNum,
    dna,
    mutate() {
      // modifies random base from dna strand
      // generate random index to mutate
      const randIdx = Math.floor(Math.random() * this.dna.length);
      // extract the value at the random index
      const targetBase = this.dna[randIdx];
      // generate random new value
      let newBase = returnRandBase();

      // check that random value is different from the current value
      while (targetBase === newBase) {
        newBase = returnRandBase();
      }
      // modify and return the dna
      this.dna[randIdx] = newBase;
      return dna;
    },
    compareDNA(pAequor) {
      if (pAequor.dna.length !== dna.length) {
        return "Please provide 2 strands that are equal in length";
      }
      if (pAequor.speciminNum === speciminNum) {
        pAequor.speciminNum = pAequor.speciminNum + "(1)";
      }
      let matchCounter = 0;
      for (item in pAequor.dna) {
        if (pAequor.dna[item] === dna[item]) {
          matchCounter += 1;
        }
      }
      const percentMatch = Math.round(
        (matchCounter / pAequor.dna.length) * 100,
        2
      );
      return `specimin number ${this.speciminNum} and ${pAequor.speciminNum} have ${percentMatch}% in common`;
    },
    willLikelySurvive() {
      const cg = { c: 0, g: 0 };
      this.dna.forEach((item) => {
        if (item === "C") {
          cg.c += 1;
        }
        if (item === "G") {
          cg.g += 1;
        }
      });

      const percent = (cg.c + cg.g) / this.dna.length;

      return percent * 100 >= 60;
    },
  };
};

const dnaMaker = (numSamples) => {
  const results = [];
  for (let i = 0; i <= numSamples; i++) {
    results.push(pAequorFactory(i + 1, mockUpStrand()));
  }
  return results;
};

const sample30 = dnaMaker(30);
console.log(sample30);
console.log(sample30[0].compareDNA(sample30[25]));
