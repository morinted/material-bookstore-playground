'use strict';
angular.module('books', [])
    .controller('MainController', ['$scope', 'booksDB', 'cart', '$location', function (
        $scope,
        booksDB,
        cart,
        $location
    ) {
        $scope.title = "Bookr";
        $scope.db = booksDB;
        $scope.cart = cart;
        $scope.category = "Browse by Category";

        $scope.searchTextChange = function (text) {
            console.log("search text changed to " + text);
        }

        console.log(booksDB.category);

        $scope.goToCategory = function (cat) {
            console.log("going to category " + cat);
            // don't navigate if the default is still selected
            if (cat !== "Browse by Category") {

                var catIndex = $scope.db.categories.indexOf(cat);
                if (catIndex != -1) {
                    console.log("index = " + catIndex);
                    $scope.results = booksDB.getBooksByCategory(catIndex);
                    booksDB.category = catIndex;
                    $location.path('/result');
                } else {
                    console.log("could not find category " + cat);
                }

            }
        };


    }])
    .filter('booklimit', [function () {
        return function (title, limit) {
            title = title.trim();
            if (title.length > limit) {
                title = title.substr(0, limit);
                var ls = title.lastIndexOf(' ');
                if (ls > -1) {
                    title = title.substr(0, ls);
                }
                return title + '...';
            }
            return title;
        };
    }])
    .filter('bookcontent', ['booksDB',
        function (booksDB) {
            return function (books, keyword) {
                keyword = keyword.toLowerCase();
                if (!keyword || !books) {
                    return [];
                }
                var j = 0,
                    len = books.length,
                    book,
                    results = [],
                    i = 0,
                    cats,
                    catLen;
                for (j; j < len; j += 1) {
                    book = books[j];
                    if (book.title.toLowerCase().indexOf(keyword) > -1) {
                        results.push(book);
                    } else if (book.author.toLowerCase().indexOf(keyword) > -1) {
                        results.push(book);
                    } else {
                        i = 0;
                        cats = book.categories;
                        catLen = cats.length;
                        for (i; i < catLen; i += 1) {
                            if (booksDB.categories[cats[i]].toLowerCase().indexOf(keyword) > -1) {
                                results.push(book);
                                break;
                            }
                        }
                    }
                }
                return results;
            };
        }])
    .factory('booksDB', [function () {
        var db = {};

        db.categories = [
            "Browse by Category",
            // 1,   2              3            4
            "Art", "Photography", "Biographies", "Children's Books",
            // 5          6                     7           8
            "Cookbooks", "Health and Fitness", "Fantasy", "Fitness",
            // 8        10           11                12
            "Mystery", "Romance", "Science Fiction", "Non-Fiction",
            // 13
            "Self-Help",

        ];

        db.category = 0;

        db.toDate = function (date) {
            var year,
                month;

            year = Math.floor(date);
            month = date % 1;

            if (month <= 0.01) {
                month = "January";
            } else if (month <= 0.02) {
                month = "February";
            } else if (month <= 0.03) {
                month = "March";
            } else if (month <= 0.04) {
                month = "April";
            } else if (month <= 0.05) {
                month = "May";
            } else if (month <= 0.06) {
                month = "June";
            } else if (month <= 0.07) {
                month = "July";
            } else if (month <= 0.08) {
                month = "August";
            } else if (month <= 0.09) {
                month = "September";
            } else if (month <= 0.10) {
                month = "October";
            } else if (month <= 0.11) {
                month = "November";
            } else {
                month = "December";
            }

            return month + " " + year;
        };

        db.books = [
            {
                author: 'Harold J. Morowitz',
                title: 'The Thermodynamics of Pizza',
                description: '50+ essays by Prof. Morowitz, a biophysicist. He reflects on questions that arise in the course of his daily life, his scientific research, and his miscellaneous reading.',
                price: 19.99,
                percentOff: 0,
                sales: 3,
                categories: [11],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/711YG15PYML._SX334_BO1,204,203,200_.gif',
                releaseDate: 1991.12,
            },
            {
                author: 'Anthony M. Amore',
                title: ' The Art of the con: The Most Notorious Fakes, Frauds, and Forgeries in the Art World',
                pice: 18.80,
                percentOff: 0,
                sales: 2,
                categories: [0],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51okJS2%2Bn6L._SX327_BO1,204,203,200_.jpg',
                releaseDate: 2015.07,
            },
            {
                author: 'Lacy Mucklow',
                title: 'Color Me Calm: 100 Coloring Templates for Meditation and Relaxation',
                price: 17.09,
                percentOff: 10,
                sales: 10,
                categories: [0, 5, 12],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/61A6kOG89eL._SX416_BO1,204,203,200_.jpg',
                releaseDate: 2014.10
            },
            {
                author: 'Peter Hurley',
                title: 'The Headshot: The Secrets to Creating Amazing Headshot Portraits',
                price: 35.10,
                percentOff: 0,
                sales: 1,
                categories: [0, 1],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51Qqq5ruNmL._SX258_BO1,204,203,200_.jpg',
                releaseDate: 2015.08,
            },
            {
                author: 'Roberto Valenzuela',
                title: 'Picture Perfect Posing: Practicing the Art of Posing for Photographers and Models',
                price: 32.59,
                percentOff: 33,
                sales: 4,
                categories: [1],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51vi3fNrADL._SX258_BO1,204,203,200_.jpg',
                releaseDate: 2014.02,
            },
            {
                author: 'Robert K. Massie',
                title: 'Peter the Great: His Life and World',
                price: 23.09,
                percentOff: 30,
                sales: 8,
                categories: [2],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/41lKmYgb%2BTL._AA324_PIkin4,BottomRight,-54,22_AA346_SH20_OU15_.jpg',
                releaseDate: 1981.10,
            },
            {
                author: 'Robert K. Massie',
                title: 'Catherine the Great: Portrait of a Woman',
                price: 10.90,
                percentOff: 10,
                sales: 4,
                categories: [2],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51sOOCo8yqL._SX329_BO1,204,203,200_.jpg',
                releaseDate: 2012.18,
            },
            {
                author: 'Dr. Seuss',
                title: 'Oh, the Places You\'ll Go!',
                price: 16.93,
                percentOff: 0,
                sales: 7,
                categories: [3],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51Fnoqj1veL._SX372_BO1,204,203,200_.jpg',
                releaseDate: 1990.01,
            },
            {
                author: 'Margaret Wise Brown',
                title: 'Goodnight Moon',
                price: 8.54,
                percentOff: 0,
                sales: 5,
                categories: [3],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51BAiqWrzuL._SY440_BO1,204,203,200_.jpg',
                releaseDate: 1991.09,
            },
            {
                author: 'Maunika Gowardhan',
                title: 'Indian Kitchen',
                price: 24.44,
                sales: 4,
                percentOff: 23,
                categories: [4],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51ybywxw7uL._SX381_BO1,204,203,200_.jpg',
                releaseDate: 2015.06,
            },
            {
                author: 'Gordon Ramsay',
                title: 'Gordon Ramsay\'s Home Cooking: Everything You Need to Know to Make Fabulous Food',
                price: 32.99,
                salesP: 12,
                percentOff: 11.27,
                categories: [4],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51KRDDw84EL._SX404_BO1,204,203,200_.jpg',
                releaseDate: 2013.04,
            },
            {
                author: 'Bessel van der Kolk MD',
                title: 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma',
                price: 21.06,
                sales: 32,
                percentOff: 11.89,
                categories: [5],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51taK8f2IsL._SX336_BO1,204,203,200_.jpg',
                releaseDate: 2014.09,
            },
            {
                author: 'Peter A. levine Ph.D.',
                title: 'In an Unspoken Voice: How the Body Releases Trauma and Restores Goodness',
                price: 18.01,
                sales: 9,
                percentOff: 90,
                categories: [5],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/515un6EJypL._SX331_BO1,204,203,200_.jpg',
                releaseDate: 2010.09,
            },
            {
                author: 'George R.R. Martin',
                title: 'Song of Ice and Fire Series Boxed Set',
                price: 59.95,
                sales: 8,
                percentOff: 38,
                categories: [6],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/61Y-vYqyqYL._SY480_BO1,204,203,200_.jpg',
                releaseDate: 2013.10,
            },
            {
                author: 'George R.R. Martin',
                title: 'The World of Ice and Fire: The Untold History of Westeros and the Game of Thrones',
                price: 58.00,
                sales: 2,
                percentOff: 36,
                categories: [6],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51iBRcy2T9L._SX375_BO1,204,203,200_.jpg',
                releaseDate: 2014.10,
            },
            {
                author: 'Austin Stenback',
                title: 'Fitness: TOP 10 EXERCISING TIPS',
                price: 1.24,
                sales: 3,
                percentOff: 0,
                categories: [7],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/41hV5BjG7ML._AA324_PIkin4,BottomRight,-60,22_AA346_SH20_OU15_.jpg',
                releaseDate: 1965.09,
            },
            {
                author: 'Austin Stenback',
                title: 'Weight Loss Blueprint: Complete Guide to a Healthier Lifestyle',
                price:  1.25,
                sales: 7,
                percentOff: 0,
                categories: [7],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51K2lMxswOL._SX312_BO1,204,203,200_.jpg',
                releaseDate: 2017.02,
            },
            {
                author: 'Gillian Flynn',
                title: 'Dark Places',
                price: 32.72,
                sales: 5,
                percentOff: 0,
                categories: [8],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/4105SNx1WGL._SX322_BO1,204,203,200_.jpg',
                releaseDate: 2010.05,
            },
            {
                author: 'Paula Hawkins',
                title: 'The Girl on the Traim',
                price: 24.95,
                percentOff: 28,
                categories: [8],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51-VcOHdoFL._SX349_BO1,204,203,200_.jpg',
                releaseDate: 2015.01,
                sales: 3,
            },
            {
                author: 'John Green',
                title: 'Paper Towns',
                price: 10.99,
                percentOff: 10,
                categories: [9],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51hgkNew%2BXL._SX332_BO1,204,203,200_.jpg',
                releaseDate: 2009.09,
                sales: 4,
            },
            {
                author: 'John Green',
                title: 'The Fault in Our Stars',
                price: 16.61,
                percentOff: 28,
                categories: [3, 9],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51%2BWr7FHRKL._SX332_BO1,204,203,200_.jpg',
                releaseDate: 2012.01,
                sales: 8,
            },
            {
                author: 'Andy Weir',
                title: 'The Martian: A Novel',
                price: 19.95,
                percentOff: 15,
                categories: [10],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51vvjWGOTYL._SX322_BO1,204,203,200_.jpg',
                releaseDate: 2015.08,
                sales: 6,
            },
            {
                author: 'Neal Stephenson',
                title: 'Steveneves: A Novel',
                price: 39.99,
                percentOff: 35,
                categories: [10],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/41ophY78M2L._SX323_BO1,204,203,200_.jpg',
                releaseDate: 2015.05,
                sales: 0,
            },
            {
                author: 'Grand Corps Malada',
                title: 'Patients',
                price: 21.95,
                percentOff: 10,
                categories: [11],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/41jFSYpZAfL._SX340_BO1,204,203,200_.jpg',
                releaseDate: 2012.11,
                description: 'Grand Corps Malade, « l’homme à la béquille qui a fait entrer le slam en France par la grande porte », nous entraîne en totale immersion dans le récit de son année en centre de rééducation pour personnes lourdement handicapées. Humour et émotion.Il y a une quinzaine d’années, en chahutant avec des amis, le jeune Fabien, pas encore vingt ans, fait un plongeon dans une piscine. Il heurte le fond du bassin, dont l’eau n’est pas assez profonde, et se déplace les vertèbres. Bien qu’on lui annonce qu’il restera probablement paralysé à vie, il retrouve peu à peu l’usage de ses jambes après une année de rééducation. Quand il se lance dans une carrière d’auteur-chanteur-slameur, en 2003, c’est en référence aux séquelles de cet accident – mais aussi à sa grande taille (1,94 m) – qu’il prend le nom de scène de Grand Corps Malade.On connaît l’immense succès qui suit : trois albums plébiscités par le public et la critique, une distinction de Chevalier des Arts et des Lettres, qui récompense la qualité de sa plume, toujours subtile et surprenante. Dans ses chansons pleines de justesse, telles À l’école de la vie, Roméo kiffe Juliette, Éducation nationale, ou encore Rachid Taxi, l’artiste soulève le voile d’une réalité sociale et politique singulière. Il raconte, avec humour, dérision et beaucoup d’émotion, les douze mois passés en centre de rééducation et relate les aventures tragiques, mais aussi cocasses, vécues par lui et ses colocataires d’infortune.',
                sales: 4,
            },
            {
                author: 'Cristophe Aleveque',
                title: 'On Marche sur la Dette',
                price: 26.95,
                percentOff: 0,
                categories: [11],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51UttZbJUTL._SX336_BO1,204,203,200_.jpg',
                releaseDate: 2015.06,
                description: "« La Dette publique ? Mon Dieu.Le martinet des experts en expertise fait plus peur que la dette elle-même. L’impression d'assister à un film d'horreur où quoi que l'on fasse, on mourra tous à la fin…Pourtant, comme ça nous grattait vraiment l'entrejambe, nous sommes allés voir cette Dette d'un peu plus près.La Dette publique, c’est quoi ça ? Combien doit-on ? A qui ? Depuis quand, pourquoi, et jusqu’à quand ? Et quelle est la différence avec mes dettes à moi ?Nous avons mené l'enquête tels deux incultes de base. Incultes ? Peut-être, mais alors comme les 99% de la population. Les autres ? Le 1% qui nous promène.Pourtant, il s’agit bien de notre vie quotidienne, tant nous sommes des dégâts collatéraux sur pattes.Armés de notre détecteur de baratin, nous sommes allés dynamiter les premières grandes mystifications qui se dressaient sur notre chemin. Finalement, pour comprendre, il suffit comme dans un tour de magie de détourner le regard de l’endroit où le prestidigitateur-expert attire notre oeil…Une certitude en tous cas : si nous avons réussi à comprendre, tout le monde en sera capable. »Christophe Alévêque et Vincent Glenn",
                sales: 3,
            },
            {
                author: 'Cara Stein',
                title: 'How to Be Happy',
                price: 7.56,
                percentOff: 2,
                categories: [5, 12],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/41N6VQmwoKL._SX322_BO1,204,203,200_.jpg',
                releaseDate: 2011.03,
                description: "It's not easy being happy in today's world. Let's face it, most people don't enjoy their lives much. Between their jobs, money worries, too many things to do, and too little time, most people are lucky to have one hour of happiness a week. Don't settle for that! Even if you have a pretty good life, maybe a B+, you can have more. You can build the life you want and be happy. It's not a trick or a scam, it's not a bunch of silly nonsense you tell yourself and try to believe, and it's not outside your power. It's real, and it's a gift you can give yourself. What you'll learn inside: * The roots of unhappiness and 6 common mistakes people make when seeking happiness * The mechanics of happiness and how it really works * 10 faulty assumptions that may be holding you back * How to let go of old memories, thoughts, and beliefs that stand in your way * 10 tools you can use to create genuine happiness now * How to build purpose and meaning into your life (no religion needed) * How to go from stressed out to chilled out * How to feel great and enjoy life on an everyday basis This book will tell you how you can be truly, genuinely happy on a daily basis. I've gathered the best from academic research, books, and my own experience to create this simple yet comprehensive happiness guide so you can start living a happier life today.",
            },
            {
                author: 'Cara Stein',
                title: 'Relax and Color: An Oasis of Me-Time in Your Busy Day',
                price: 12.65,
                percentOff: 0,
                sales: 8,
                categories: [12],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/619Gh64I9UL._SX258_BO1,204,203,200_.jpg',
                releaseDate: 2015.05,
                description: "Sometimes, all you need is a break--a small treat that's just for you, to help you recharge and center your mind so you can face the rest of your life with grace. That's what this book offers. Relax and Color is a coloring book for grownups. It's filled with inspiration and beauty, so that you can relax, be creative, and get back in touch with your best self. The designs are printed on only one side of the page, so you can color to your heart's content without worrying about ruining the next design. If you wish, each page can become a work of art. Just take it out of the book and display it or give it as a gift to someone you love! But this isn't just a coloring book. The other side of each page also has an inspiring quote or a question to ponder, so you have a positive place to rest your mind as you color. Coloring is a simple pleasure that's not just for kids. We all need a creative outlet, and coloring offers an easy, stress-free way to be creative and make something beautiful. Coloring books for grownups are selling millions and topping bestseller lists. It's your turn to join the fun! Get out the colored pencils or markers and go ahead--relax and color!",
            }
        ];

        db.getPrice = function (book) {
            return book.price * (1 - book.percentOff / 100);
        };

        db.keyword = '';
        db.orders = [
            "Title",
            "Price",
            "Sale",
            "Release Date",
        ];
        db.orderBy = function (criteria, ascending, books) {
            if (!books) {
                books = db.books;
            }
            var prop;
            if (criteria === 0) {
                prop = 'title';
            } else if (criteria === 1) {
                prop = 'price';
            } else if (criteria === 2) {
                prop = 'percentOff';
            } else if (criteria === 3) {
                prop = 'releaseDate';
            }
            function sortByProp(a, b) {
                if (a[prop] < b[prop]) {
                    return -1;
                }
                if (a[prop] > b[prop]) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                if (a.author < b.author) {
                    return -1;
                }
                if (a.author > b.author) {
                    return 1;
                }
                return 0;
            }
            books.sort(sortByProp);
            if (!ascending) {
                books.reverse();
            }
            return books;
        };

        db.getTop = function (n, criteria, books) {
            if (!books) {
                books = db.books;
            }
            var ascending = true,
                results;

            if (criteria === 2 || criteria === 3) {
                ascending = false;
            }
            if (n) {
                results = db.orderBy(criteria, ascending, books)
                    .slice(0, n);
            }
            return results;
        };

        db.getBooksByCategory = function (category) {
            var results = [],
                i = 0,
                len = db.books.length,
                catLen,
                cats,
                j;

                category--;
            for (i; i < len; i += 1) {
                cats = db.books[i].categories;
                catLen = cats.length;
                j = 0;
                for (j; j < catLen; j += 1) {
                    if (cats[j] === category) {
                        results.push(db.books[i]);
                        break;
                    }
                }
            }
            return results;
        };



        return db;
    }])
    .factory('cart', ['booksDB', function (db) {
        var cart = {};

        cart.content = [];

        cart.addToCart = function (book, quantity, set) {
            // Exclude 'set' for regular add to cart,
            // include to 'set' quantity, or use other
            // function.
            var i = 0,
                len = cart.content.length;
            for (i; i < len; i += 1) {
                if (JSON.stringify(
                        cart.content[i].book
                    ) === JSON.stringify(book)) {
                    if (!set) {
                        cart.content[i].quantity += quantity;
                    } else {
                        cart.content[i].quantity = quantity;
                    }
                    return;
                }
            }
            cart.content.push(
                {
                    quantity: quantity,
                    book: book,
                }
            );
        };

        cart.setQuantity = function (book, quantity) {
            cart.addToCart(book, quantity, true);
        };

        cart.removeFromCart = function (book) {
            var i = 0,
                len = cart.content.length;
            for (i; i < len; i += 1) {
                if (JSON.stringify(
                        cart.content[i].book
                    ) === JSON.stringify(book)) {
                    cart.content.splice(i, i + 1);
                    return;
                }
            }
            console.error("Unable to find " + book.title + " in cart.");
        };

        cart.total = function (content) {
            var total = 0.0,
                i = 0,
                len = content.length,
                entry;
            for (i; i < len; i += 1) {
                entry = content[i];
                if (entry.quantity > 0) {
                    total += db.getPrice(entry.book) * entry.quantity;
                }
            }
            return total;
        };
        return cart;
    }]);
