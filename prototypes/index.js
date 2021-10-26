const { kitties } = require('./datasets/kitties');
const { clubs } = require('./datasets/clubs');
const { mods } = require('./datasets/mods');
const { cakes } = require('./datasets/cakes');
const { classrooms } = require('./datasets/classrooms');
const { breweries } = require('./datasets/breweries');
const { nationalParks } = require('./datasets/nationalParks');
const { books } = require('./datasets/books');
const { weather } = require('./datasets/weather');
const { instructors, cohorts } = require('./datasets/turing');
const { bosses, sidekicks } = require('./datasets/bosses');
const { constellations, stars } = require('./datasets/astronomy');
const { weapons, characters } = require('./datasets/ultima');
const { dinosaurs, humans, movies } = require('./datasets/dinosaurs');






// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangeKittyNames() {
    const result = kitties.filter((kitten) => {
      return kitten.color === 'orange';
    }).map((kitten) => {
      return kitten.name;
    });
    return result;
    // Annotation:
    // Goal: Return an array of just the names of kitties who are orange e.g. ['Tiger', 'Snickers']
    // Method: first filter the array for kitties that are orange AND THEN map over this new array to pull out the names as a new array again
  },

  sortByAge() {
    const result = kitties.sort((a, b) => {
      return b.age - a.age;
    });
    return result;

    // Annotation:
    // Goal: Sort the kitties by their age
    // Method: Return an array that is sorted oldest to youngest, so b-a, instead of a-b.
  },

  growUp() {
    const result = kitties.map((kitten) => {
      kitten.age += 2;
      return kitten;
    });
    return result;

    // Annotation:
    // Goal: Return an array of kitties who have all grown up by 2 years (age of 2 would then be 4)
    // Method: Use map to return an array with updated age for each kitty
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {

    const newPersonToClubObject = clubs.reduce((obj, each) => {
      each.members.forEach((person) => {
        if (obj[person]) {
          obj[person].push(each.club);
        } else {
          obj[person] = [each.club];
        }
      });
      return obj;
    }, {});

    return newPersonToClubObject;

    // Annotation:
    // GOAL: Create an object whose keys are the names of people, and whose values are
    // arrays that include the names of the clubs that person is a part of. e.g.
    // {
    //   Louisa: ['Drama', 'Art'],
    //   Pam: ['Drama', 'Art', 'Chess'],
    //   ...etc
    // }
    // Method: Map over the array to create a new object. For each member, if the name is not a current key then add it with the corresponding club to the array it is holding, else assign the new name as a key with the array holding the club name.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: mods from ./datasets/mods
const modPrompts = {
  studentsPerMod() {
    const result = mods.map((each) => {
      let newObj = {};
      newObj.mod = each.mod;
      newObj.studentsPerInstructor = (each.students / each.instructors);
      return newObj;
    });
    return result;

  // Annotation:
  // GOAL: Return an array of objects where the keys are mod (the number of the module) and studentsPerInstructor (how many students per instructor there are for that mod) e.g.
  // [
  //   { mod: 1, studentsPerInstructor: 9 },
  //   { mod: 2, studentsPerInstructor: 11 },
  //   { mod: 3, studentsPerInstructor: 10 },
  //   { mod: 4, studentsPerInstructor: 8 }
  // ]
  // Method: use map to return array of same length with object at each index w/ two properties: mod number and students/instructor
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  stockPerCake() {
    // Return an array of objects that include just the flavor of the cake and how
    // much of that cake is in stock e.g.
    // [
    //    { flavor: 'dark chocolate', inStock: 15 },
    //    { flavor: 'yellow', inStock: 14 },
    //    ..etc
    // ]

    const result = cakes.map((each) => {
      let newObj = {};
      newObj.flavor = each.cakeFlavor;
      newObj.inStock = each.inStock;
      return newObj;
    });
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  onlyInStock() {
    // Return an array of only the cakes that are in stock
    // e.g.
    // [
    //   {
    //   cakeFlavor: 'dark chocolate',
    //   filling: null,
    //   frosting: 'dark chocolate ganache',
    //   toppings: ['dutch process cocoa', 'toasted sugar', 'smoked sea salt'],
    //   inStock: 15
    // },
    // {
    //   cakeFlavor: 'yellow',
    //   filling: 'citrus glaze',
    //   frosting: 'chantilly cream',
    //   toppings: ['berries', 'edible flowers'],
    //   inStock: 14
    // },
    // ..etc
    // ]

    const result = cakes.filter(each => each.inStock > 0);
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  totalInventory() {
    // Return the total amount of cakes in stock e.g.
    // 59

    const result = cakes.reduce((sum, each) => {
      sum += each.inStock;
      return sum;
    }, 0);
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  allToppings() {
    // Return an array of all unique toppings (no duplicates) needed to bake
    // every cake in the dataset e.g.
    // ['dutch process cocoa', 'toasted sugar', 'smoked sea salt', 'berries', ..etc]

    const result = cakes.reduce((acc, each) => {
      each.toppings.forEach((topping) => {
        if (!acc.includes(topping)) {
          acc.push(topping);
        }
      });
      return acc;
    }, []);
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  groceryList() {
    // I need to make a grocery list. Please give me an object where the keys are
    // each topping, and the values are the amount of that topping I need to buy e.g.
    // {
    //    'dutch process cocoa': 1,
    //    'toasted sugar': 3,
    //    'smoked sea salt': 3,
    //    'berries': 2,
    //    ...etc
    // }

    const result = cakes.reduce((acc, each) => {
      each.toppings.forEach((topping) => {
        if (!acc[topping]) {
          acc[topping] = 1;
        } else {
          acc[topping]++;
        }
      });
      return acc;
    }, {});
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    // Create an array of just the front-end classrooms. e.g.
    // [
    //   { roomLetter: 'A', program: 'FE', capacity: 32 },
    //   { roomLetter: 'C', program: 'FE', capacity: 27 },
    //   { roomLetter: 'E', program: 'FE', capacity: 22 },
    //   { roomLetter: 'G', program: 'FE', capacity: 29 }
    // ]

    const result = classrooms.filter((room) => {
      return room.program === 'FE';
    });
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  totalCapacities() {
    // Create an object where the keys are 'feCapacity' and 'beCapacity',
    // and the values are the total capacity for all classrooms in each program e.g.
    // {
    //   feCapacity: 110,
    //   beCapacity: 96
    // }

    const result = classrooms.reduce((acc, room) => {
      if (room.program === 'FE') {
        acc.feCapacity += room.capacity;
      } else {
        acc.beCapacity += room.capacity;
      }
      return acc;
    }, {feCapacity: 0, beCapacity: 0});
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  sortByCapacity() {
    // Return the array of classrooms sorted by their capacity (least capacity to greatest)

    const result = classrooms.sort((a, b) => {
      return a.capacity - b.capacity;
    });
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: books from './datasets/books

const bookPrompts = {
  removeViolence() {
    // return an array of all book titles that are not horror or true crime. Eg:

    //  ['1984', 'The Great Gatsby', 'Lord of the Flies', 'Harry Potter and the Sorcerer\'s Stone',
    //   'The Hitchhiker\'s Guide to the Galaxy', 'Flowers for Algernon', 'Slaughterhouse-Five',
    //   'The Handmaid\'s Tale', 'The Metamorphosis', 'Brave New World', 'Life of Pi',
    //   'The Curious Incident of the Dog in the Night - Time', 'The Bell Jar',
    //   'Catch-22', 'Treasure Island']


    const result = books.reduce((acc, book) => {
      if (!(book.genre === 'Horror') && !(book.genre === 'True Crime')) {
        acc.push(book.title);
      }
      return acc;
    }, []);
    return result;

    // Annotation:
    // Write your annotation here as a comment

  },
  getNewBooks() {
    // return an array of objects containing all books that were
    // published in the 90's and 00's. Inlucde the title and the year Eg:

    // [{ title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
    //  { title: 'Life of Pi', year: 2001 },
    //  { title: 'The Curious Incident of the Dog in the Night-Time', year: 2003 }]

    const result = books.reduce((acc, book) => {

      if (book.published >= 1990) {
        acc.push({title: book.title, year: book.published});
      }
      return acc;
    }, []);
    return result;

    // Annotation:
    // if year is >= 1990 then add to new array as...
    // new object with keys of title -> title and published -> year
  }

};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: weather from './datasets/weather

const weatherPrompts = {
  getAverageTemps() {
    // return an array of all the average temperatures. Eg:
    // [ 40, 40, 44.5, 43.5, 57, 35, 65.5, 62, 14, 46.5 ]

    const result = weather.map((city) => {
      const avgTemp = (city.temperature.high + city.temperature.low) / 2;
      return avgTemp;
    });
    return result;

    // Annotation:
    // return an array of the same length using map ...
    // calculate and return the average temperature
  },

  findSunnySpots() {
    // Return an array of sentences of the locations that are sunny
    // and mostly sunny. Include the location and weather type. Eg:
    // [ 'Atlanta, Georgia is sunny.',
    // 'New Orleans, Louisiana is sunny.',
    // 'Raleigh, North Carolina is mostly sunny.' ]

    const result = weather.reduce((acc, city) => {
      if (city.type.includes('sunny')) {
        acc.push(`${city.location} is ${city.type}.`);
      }
      return acc;
    }, []);
    return result;

    // Annotation:
    // return an array of just the sunny cities...
    // each index should hold `${city.location} is mostly ${city.type}.`
  },

  findHighestHumidity() {
    // Return the location with the highest humidity. Eg:
    // {
    //   location: 'Portland, Oregon',
    //   type: 'cloudy',
    //   humidity: 84,
    //   temperature: { high: 49, low: 38 }
    // }

    const result = weather.sort((a, b) => {
      return b.humidity - a.humidity;
    });
    return result[0];

    // Annotation:
    // sort the array by humidity highest to lowest
    // then return the first index

  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: nationalParks from ./datasets/nationalParks

const nationalParksPrompts = {
  getParkVisitList() {
    /// Return an object containing the names of which parks I need to visit
    // and the ones I have already visited eg:
    // {
    //   parksToVisit: ["Yellowstone", "Glacier", "Everglades"],
    //   parksVisited: ["Rocky Mountain", "Acadia", "Zion"]
    //}

    const result = nationalParks.reduce((acc, park) => {
      if (park.visited) {
        acc.parksVisited.push(park.name);
      } else {
        acc.parksToVisit.push(park.name);
      }
      return acc;
    }, {parksToVisit: [], parksVisited: []});
    return result;

    // Annotation:
    // use reduce to return an object with ..
    // two keys of parksToVisit (false) and parksVisited (true)
  },

  getParkInEachState() {
    // Return an array of objects where the key is the state and the value is its National Park
    // eg: [ { Colorado: 'Rocky Mountain' },
    // { Wyoming: 'Yellowstone' },
    // { Montana: 'Glacier' },
    // { Maine: 'Acadia' },
    // { Utah: 'Zion' },
    // { Florida: 'Everglades' } ]


    const result = nationalParks.map((park) => {
      return {[park.location]: park.name};
    });
    return result;

    // Annotation:
    // use map to return a new array of the same length
    // such that each index is an object with a single property
    // with the key being the state and the value being the park name
  },

  getParkActivities() {
    // Return an array of all the activities I can do
    // in a National Park. Make sure to exclude duplicates. eg:
    // [ 'hiking',
    //   'shoeshoing',
    //   'camping',
    //   'fishing',
    //   'boating',
    //   'watching wildlife',
    //   'cross-country skiing',
    //   'swimming',
    //   'bird watching',
    //   'canyoneering',
    //   'backpacking',
    //   'rock climbing' ]

    const result = nationalParks.reduce((sharedActivities, park) => {
      park.activities.forEach((activity) => {
        if (!sharedActivities.includes(activity)) {
          sharedActivities.push(activity);
        }
      });
      return sharedActivities;
    }, []);
    return result;

    // Annotation:
    // use reduce to return another array with all activities
    // from all parks with now duplicates
  }
};



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    // Return the total beer count of all beers for every brewery e.g.
    // 40

    const result = breweries.reduce((beerTotal, brewery) => {
      return beerTotal += brewery.beers.length;
    }, 0);
    return result;

    // Annotation:
    // use reduce to return the total number of beers by
    // summing the length of each brewery's beer list
  },

  getBreweryBeerCount() {
    // Return an array of objects where each object has the name of a brewery
    // and the count of the beers that brewery has e.g.
    // [
    //  { name: 'Little Machine Brew', beerCount: 12 },
    //  { name: 'Ratio Beerworks', beerCount: 5},
    // ...etc.
    // ]

    const result = breweries.map((brewery) => {
      return {name: brewery.name, beerCount: brewery.beers.length};
    });
    return result;

    // Annotation:
    // return an array of the same length s.t. each index is
    // an object with two keys: name (name) & beerCount (.beers.length)
  },

  findHighestAbvBeer() {
    // Return the beer which has the highest ABV of all beers
    // e.g.
    // { name: 'Barrel Aged Nature\'s Sweater', type: 'Barley Wine', abv: 10.9, ibu: 40 }

    const result = breweries.flatMap((brewery) => {
      return brewery.beers;
    }).sort((first, second) => {
      return second.abv - first.abv;
    });
    return result[0];

    // Annotation:
    // return the beer with the highest abv of all beers in all breweries
    // first flatMap() the beers into a new array, then sort highest to lowest and finally return the first index
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module. e.g.
    // [
    //  { name: 'Pam', studentCount: 21 },
    //  { name: 'Robbie', studentCount: 18 }
    // ]

    const result = instructors.reduce((instructorAndStudents, instructor) => {
      instructorAndStudents.push({name: instructor.name, studentCount: cohorts[instructor.module - 1].studentCount});
      return instructorAndStudents;
    }, []);
    return result;

    // Annotation:
    // return one array based on instructors
    // each index is a teacher with keys name(from instructors array) and studentCount(from cohorts array)
  },

  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.
    // {
    // cohort1806: 9,
    // cohort1804: 10.5
    // }

    const result = cohorts.reduce((studentTeacherRatios, cohort) => {
      let numTeachers = instructors.filter((instructor) => {
        return instructor.module === cohort.module;
      }).length;
      let ratio = cohort.studentCount / numTeachers;
      studentTeacherRatios['cohort' + cohort.cohort] = ratio;
      return studentTeacherRatios;
    }, {});
    return result;

    // Annotation:
    // return an object with keys of cohorts.cohort, and a value of students / teacher
    // which is (cohorts.studentCount / filter(instructors.module#))
    // cohorts.reduce...
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [2, 4],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }

    const result = instructors.reduce((teachersModulesTaught, instructor) => {
      let modules = cohorts.reduce((moduleNumbers, cohort) => {
        let foundConcepts = [];
        cohort.curriculum.forEach((concept) => {
          if (instructor.teaches.includes(concept)) {
            foundConcepts.push(concept);
          }
        });
        if (foundConcepts.length > 0) {
          moduleNumbers.push(cohort.module);
        }
        return moduleNumbers;
      }, []);
      teachersModulesTaught[instructor.name] = modules;
      return teachersModulesTaught;
    }, {});
    return result;

    // Annotation:
    // use reduce on instructors array to return an object
    // where each key is (instructor.name)
    // and it holds and array of the modules that they can teach...
    // take the smaller array (from cohorts.curriculum) and if it is included in the larger array (from instructors.teaches), then add that module number to the array held in the object being returned
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // {
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    const result = cohorts.reduce((conceptAndTeachers, cohort) => {
      cohort.curriculum.forEach((concept) => {
        let allNames = instructors.reduce((names, instructor) => {
          if (instructor.teaches.includes(concept)) {
            names.push(instructor.name);
          }
          return names;
        }, []);
        if (!conceptAndTeachers[concept]) {
          conceptAndTeachers[concept] = allNames;
        }
      });
      return conceptAndTeachers;
    }, {});
    return result;

    // Annotation:
    // use reduce to return an object on cohorts array
    // in each cohort, for each curriculum array, add the concept as a key
    // then reduce the instructors array to an array s.t. if the instructor.teaches.includes(concept), then add them to the teacher array
    // assign this teacher array to the concept key

  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]
    // ------SO DIFFICULT ... first tried the following before chaining--------
    // did NOT realize that bosses was an object instead of an array ...

    // const lowerBossNames = Object.keys(bosses);
    //
    // const upperBossNames = lowerBossNames.map((boss) => {
    //   return boss.slice(0, 1).toUpperCase() + boss.slice(1);
    // });
    // ------------------------------------------------------------------------

    const bossNames = sidekicks.reduce((names, sidekick) => {
      if (!names.includes(sidekick.boss)) {
        names.push(sidekick.boss);
      }
      return names;
    }, []).map((boss) => {
      return {bossName: boss, sidekickLoyalty: 0};
    });

    sidekicks.forEach((sidekick) => {
      bossNames.forEach((boss) => {
        if (boss.bossName === sidekick.boss) {
          boss.sidekickLoyalty += sidekick.loyaltyToBoss;
        }
      });
    });

    return bossNames;

    // Annotation:
    // return an array of objects s.t. each object has two keys (bossName -> sidekicks.boss), and (sidekickLoyalty -> sum of all sidekicks loyalty)
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]
    const constellationStars = Object.keys(constellations);

    const result = stars.reduce((includedStars, star) => {
      constellationStars.forEach((constellation) => {
        if (constellations[constellation].stars.includes(star.name)) {
          includedStars.push(star);
        }
      });
      return includedStars;
    }, []);

    return result;

    // Annotation:
    // return an array of stars that appear in one of the three constellations,
    //get array of constellation keys, then reduce over stars, then check
    // if keysArray.forEach of the constellations if the
    // .stars.includes(star.name) then add it to the accumulator
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    const starsByColor = stars.reduce((colorsWithStars, star) => {
      if (!colorsWithStars[star.color]) {
        colorsWithStars[star.color] = [];
      }
      return colorsWithStars;
    }, {});

    stars.forEach((star) => {
      starsByColor[star.color].push(star);
    });

    return starsByColor;

    // Annotation:
    // return an object from reduce on the stars array
    // the object has keys that are all the colors, s.t. each holds an array
    // the array is then populated by forEach on the stars, push star into array of the correct color match
  },

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.

    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra",
    //    "Canis Minor",
    //    "The Plow",
    //    "Orion",
    //    "The Little Dipper" ]


    const result = stars.sort((first, second) => {
      return first.visualMagnitude - second.visualMagnitude;
    }).filter((star) => {
      return star.constellation;
    }).map((star) => {
      return star.constellation;
    });
    return result;

    // Annotation: chain these:
    // return an array of sorted stars. lowest to highest on visualMagnitude
    // filter to keep only stars with named constellation
    // map s.t. each index is just the constellation name's string
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    const result = characters.reduce((totalDamage, character) => {
      character.weapons.forEach((weapon) => {
        totalDamage += weapons[weapon].damage;
      });
      return totalDamage;
    }, 0);
    return result;

    // Annotation:
    // reduce the characters array to a total damage number from weapons
    // forEach weapon in weapons, add on the weapon damage from the object weapons
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object.
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    const result = characters.map((character) => {
      let totalsObj = character.weapons.reduce((totals, weapon) => {
        totals.damage += weapons[weapon].damage;
        totals.range += weapons[weapon].range;
        return totals;
      }, {damage: 0, range: 0});
      let name = character.name;
      return {[name]: totalsObj};
    });
    return result;

    // Annotation:
    // return an array of the same length as characters, s.t.
    // each index is an object with a key name of character.name
    // which is holding an object with damage: total weapon damage
    // and range: total weapon range (use reduce here...)
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    const result = movies.reduce((titlesDinos, movie) => {
      const numAwesomeDinos = movie.dinos.filter((dino) => {
        return dinosaurs[dino].isAwesome;
      });
      titlesDinos[movie.title] = numAwesomeDinos.length;
      return titlesDinos;
    }, {});
    return result;

    // Annotation:
    // Return an object using reduce on the  movies array
    // the object should have the movie title as the key name
    // and the length of the dinos array as its value
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      {
        'Steven Spielberg':
          {
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37
          },
        'Joe Johnston':
          {
            'Jurassic Park III': 44
          },
        'Colin Trevorrow':
          {
            'Jurassic World': 56
           },
        'J. A. Bayona':
          {
            'Jurassic World: Fallen Kingdom': 59
          }
      }
    */

    const result = movies.reduce((directorsMoviesActorsAges, movie) => {
      if (!directorsMoviesActorsAges[movie.director]) {
        directorsMoviesActorsAges[movie.director] = {};
      }
      return directorsMoviesActorsAges;
    }, {});

    movies.forEach((movie) => {
      const avgAge = movie.cast.reduce((totalAge, member) => {
        totalAge += movie.yearReleased - humans[member].yearBorn;
        return totalAge;
      }, 0) / movie.cast.length;
      result[movie.director][movie.title] = Math.floor(avgAge);
    });
    return result;

    // Annotation:
    // reduce over the movies array to create an object with keys
    // that are the movie.director, then reduce over the cast array to
    // get the average age of the actors
    // iterate over the movies array again with forEach to assign the movies and avg age to the correct director
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      },
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */
    const allActors = Object.keys(humans);

    const movieActors = movies.flatMap((movie) => {
      return movie.cast;
    });

    const result = allActors.reduce((notYets, human) => {
      if (!movieActors.includes(human)) {
        notYets.push({name: human, nationality: humans[human].nationality, imdbStarMeterRating: humans[human].imdbStarMeterRating});
      }
      return notYets;
    }, []).sort((a, b) => {
      if (a.nationality < b.nationality) {
        return -1;
      } else if (a.nationality > b.nationality) {
        return 1;
      } else {
        return 0;
      }
    });

    return result;

    // Annotation:
    // First need to make an array of actors from the humans object with the keys method
    // then for each actor check if they are included in each movie's cast array, if not, then keep, if so, remove
    // use reduce on new array to return another array with their info except year born
    // sort this array alphabetically by nationality
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */
    const allActors = Object.keys(humans);

    const movieActors = movies.flatMap((movie) => {
      return movie.cast;
    });

    const result = allActors.reduce((actors, actor) => {
      if (movieActors.includes(actor)) {
        actors.push({name: actor, ages: []});
      }
      return actors;
    }, []).map((actor) => {
      movies.forEach((movie) => {
        movie.cast.forEach((member) => {
          if (member === actor.name) {
            actor.ages.push(movie.yearReleased - humans[member].yearBorn);
          }
        });
      });
      return actor;
    });

    return result;

    // Annotation:
    // return an array containing only actors cast in at least one movie
    // two properties: name and ages, where ages is holding an array
    // of the actor's ages in each movie they were in
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  nationalParksPrompts,
  weatherPrompts,
  bookPrompts,
  dinosaurPrompts
};
