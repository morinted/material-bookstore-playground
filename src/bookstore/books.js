'use strict';
angular.module('books', [])
    .controller('MainController', ['$scope', 'booksDB', 'cart', '$location',
        '$mdToast', '$window',
        function (
            $scope,
            booksDB,
            cart,
            $location,
            $mdToast,
            $window
        ) {
            $scope.title = "Bookr";
            $scope.db = booksDB;
            $scope.cart = cart;
            $scope.category = "Browse by Category";
            $scope.validation = {
                postalCode: '(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)'
            };

            $scope.checkout = {};

            $scope.searchTextChange = function (text) {
                console.log(text);
            };

            $scope.goBack = function () {
                $window.history.back();
            };

            $scope.addedToCart = function (title, total) {
                console.log('spawning toast');
                $mdToast.show(
                    $mdToast.simple()
                        .content('Added ' + title + ' to cart. ' + total
                            + ' in cart.')
                        .position('bottom right')
                        .hideDelay(2000)
                );
            };

            $scope.goToResult = function (query) {
                
                $location.path('/search-result');
            };

            $scope.goToCategory = function (cat) {
                console.log("going to category " + cat);
                // don't navigate if the default is still selected
                if (cat !== "Browse by Category") {

                    var catIndex = $scope.db.categories.indexOf(cat);
                    if (catIndex !== -1) {
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
    .factory('booksDB', ['$location', function ($location) {
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

        db.goToBook = function (book) {
            db.selectedBook = book;
            $location.path("/book");
        };

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

        db.selectedBook = {};

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
                title: 'The Art of the con: The Most Notorious Fakes, Frauds, and Forgeries in the Art World',
                description: "Art scams are today so numerous that the specter of a lawsuit arising from a mistaken attribution has scared a number of experts away from the business of authentication and forgery, and with good reason. Art scams are increasingly convincing and involve incredible sums of money. The cons perpetrated by unscrupulous art dealers and their accomplices are proportionately elaborate. Anthony M. Amore's The Art of the Con tells the stories of some of history's most notorious yet untold cons. They involve stolen art hidden for decades; elaborate ruses that involve the Nazis and allegedly plundered art; the theft of a conceptual prototype from a well-known artist by his assistant to be used later to create copies; the use of online and television auction sites to scam buyers out of millions; and other confidence scams incredible not only for their boldness but more so because they actually worked. Using interviews and newly released court documents, The Art of the Con will also take the reader into the investigations that led to the capture of the con men, who oftentimes return back to the world of crime. For some, it's an irresistible urge because their innocent dupes all share something in common: they want to believe.",
                price: 18.80,
                percentOff: 0,
                sales: 2,
                categories: [0],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51okJS2%2Bn6L._SX327_BO1,204,203,200_.jpg',
                releaseDate: 2015.07,
            },
            {
                author: 'Lacy Mucklow',
                title: 'Color Me Calm: 100 Coloring Templates for Meditation and Relaxation',
                description: "Our lives become busier with each passing day, and as technology escalates, so does our access to work, obligations, and stress. Constant stimulation and expectation have left us burnt out and distanced from the present moment. \"Now\" has become something that happens online, not in the space and time that we physically occupy. Color Me Calm is a guided coloring book designed for harried adults. Art therapist Lacy Mucklow and artist Angela Porter offer up 100 coloring templates all designed to help you get coloring and get relaxed. Organized into seven therapeutically-themed chapters including Mandalas, Water Scenes, Wooded Scenes, Geometric Patterns, Flora & Fauna, Natural Patterns, and Spirituality - the book examines the benefits of putting pencil to paper and offers adults an opportunity to channel their anxiety into satisfying, creative accomplishment. Part of the international bestselling Color Me series, Color Me Calm is the perfect way step back from the stress of everyday life, color, and relax!",
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
                description: "In The Headshot: The Secrets to Creating Amazing Headshot Portraits, Hurley shares everything the reader needs to know in order to get great images of their subjects–whether it's on assignment, a personal project, or simply shots of family and friends. Starting with his trademark \"recipe\"–\"white background, flat light, chopped-off heads\"–in over a dozen chapters he covers the following: the technical aspects of the shot, including lighting, composition, and camera setup; establishing a rapport with your subject, as well as provoking thought in order to drive expression; and how to direct the subject, including detailed discussions of how to influence the jaw, the smile, the eyes, and the eyebrows. With The Headshot, readers will be equipped to dramatically improve their headshot photographs–from lighting to composition to directing the best expression from their subjects.",
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
                description: "In Picture Perfect Posing, Roberto takes on the art of posing. For many photographers, after learning to compose an image and even light it properly, a portrait can still easily be a failure if the pose is not natural, elegant, and serving the needs of both the subject and the photographer. Instead of just showing page after page of poses–like most posing books on the market–Roberto actually breaks down the concept of posing by examining the anatomy, starting with the core foundation: the spinal chord and neck. Building from there, Roberto discusses every component of what makes poses work, as well as fail. How should the model hold her hands? Bend her elbows? Position her fingers? Should the model look toward or away from the camera, and why? It all depends on what the photographer wants for the shot, and Roberto discusses the entire process, from the intent of the photographer through the execution of the pose. For those who have been discouraged by an inability to pose their subjects, or who have simply not known where to start in order to \"figure it out,\" Picture Perfect Posing is the essential resource they need to learn how posing truly works, and how they can learn to direct the exact pose they need for the shot they want.",
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
                description: "Against the monumental canvas of seventeenth- and eighteenth-century Europe and Russia unfolds the magnificent story of Peter the Great, crowned co-tsar at the age of ten. Robert K. Massie delves deep into the life of this captivating historical figure, chronicling the pivotal events that shaped a boy into a legend—including his “incognito” travels in Europe, his unquenchable curiosity about Western ways, his obsession with the sea and establishment of the stupendous Russian navy, his creation of an unbeatable army, his transformation of Russia, and his relationships with those he loved most: Catherine, the robust yet gentle peasant, his loving mistress, wife, and successor; and Menshikov, the charming, bold, unscrupulous prince who rose to wealth and power through Peter’s friendship. Impetuous and stubborn, generous and cruel, tender and unforgiving, a man of enormous energy and complexity, Peter the Great is brought fully to life.",
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
                description: "The Pulitzer Prize–winning author of Peter the Great, Nicholas and Alexandra, and The Romanovs returns with another masterpiece of narrative biography, the extraordinary story of an obscure German princess who became one of the most remarkable, powerful, and captivating women in history. Born into a minor noble family, Catherine transformed herself into empress of Russia by sheer determination. For thirty-four years, the government, foreign policy, cultural development, and welfare of the Russian people were in her hands. She dealt with domestic rebellion, foreign wars, and the tidal wave of political change and violence churned up by the French Revolution. Catherine’s family, friends, ministers, generals, lovers, and enemies—all are here, vividly brought to life. History offers few stories richer than that of Catherine the Great. In this book, an eternally fascinating woman is returned to life.",
                percentOff: 10,
                sales: 4,
                categories: [2],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51sOOCo8yqL._SX329_BO1,204,203,200_.jpg',
                releaseDate: 2012.18,
            },
            {
                author: 'Dr. Seuss',
                title: 'Oh, the Places You\'ll Go!',
                // description: "A perennial favorite, Dr. Seuss’s wonderfully wise graduation speech is the perfect send-off for children starting out in the world, be they nursery school, high school, or college grads! From soaring to high heights and seeing great sights to being left in a Lurch on a prickle-ly perch, Dr. Seuss addresses life’s ups and downs with his trademark humorous verse and illustrations, while encouraging readers to find the success that lies within. In a starred review, Booklist notes: “Seuss’s message is simple but never sappy: life may be a ‘Great Balancing Act,’ but through it all ‘There’s fun to be done.’”",
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
                description: "In a great green room, tucked away in bed, is a little bunny. \"Goodnight room, goodnight moon.\" And to all the familiar things in the softly lit room--to the picture of the three little bears sitting in chairs, to the clocks and his socks, to the mittens and the kittens, to everything one by one--he says goodnight. In this classic of modern children's literature, beloved by generations of readers and listeners, the quiet poetry of the words and the gentle, lulling illustrations combine to make a perfect book for the end of the day.",
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
                description: "Whatever your mood, Indian Kitchen will inspire you to add Indian cooking into your weekly menu.",
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
                description: "Based on a new cooking show, this book will give experienced as well as novice cooks the desire, confidence and inspiration to get cooking. Ramsay will offer simple, accessible recipes with a \"wow\" factor. Gordon has travelled the world from India and the Far East to LA and Europe, and the recipes in this book will draw all these culinary influences together to show us simple, vibrant and delicious recipes that reflect the way we eat today. For example: Miso braised salmon fillet with Asian vegetables, Pork and Bacon slider with home made bbq sauce, Curried Sweetcorn Soup, Wild Mushroom Risotto Arrancini, and Baked Lemon Cheesecake with Raspberries. ",
                price: 32.99,
                sales: 12,
                percentOff: 11.27,
                categories: [4],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51KRDDw84EL._SX404_BO1,204,203,200_.jpg',
                releaseDate: 2013.04,
            },
            {
                author: 'Bessel van der Kolk MD',
                title: 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma',
                description: "Trauma is a fact of life. Veterans and their families deal with the painful aftermath of combat; one in five Americans has been molested; one in four grew up with alcoholics; one in three couples have engaged in physical violence. Such experiences inevitably leave traces on minds, emotions, and even on biology. Sadly, trauma sufferers frequently pass on their stress to their partners and children.",
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
                description: "In this culmination of his life’s work, Peter A. Levine draws on his broad experience as a clinician, a student of comparative brain research, a stress scientist and a keen observer of the naturalistic animal world to explain the nature and transformation of trauma in the body, brain and psyche. In an Unspoken Voice is based on the idea that trauma is neither a disease nor a disorder, but rather an injury caused by fright, helplessness and loss that can be healed by engaging our innate capacity to self-regulate high states of arousal and intense emotions. Enriched with a coherent theoretical framework and compelling case examples, the book elegantly blends the latest findings in biology, neuroscience and body-oriented psychotherapy to show that when we bring together animal instinct and reason, we can become more whole human beings.",
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
                description: "For the first time, all five novels in the epic fantasy series that inspired HBO’s Game of Thrones are together in one boxed set. An immersive entertainment experience unlike any other, A Song of Ice and Fire has earned George R. R. Martin—dubbed “the American Tolkien” by Time magazine—international acclaim and millions of loyal readers. Now here is the entire monumental cycle.",
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
                description: "This lavishly illustrated volume is a comprehensive history of the Seven Kingdoms, providing vividly constructed accounts of the epic battles, bitter rivalries, and daring rebellions that lead to the events of A Song of Ice and Fire and HBO’s Game of Thrones. In a collaboration that’s been years in the making, Martin has teamed with Elio M. García, Jr., and Linda Antonsson, the founders of the renowned fan site Westeros.org—perhaps the only people who know this world almost as well as its visionary creator.",
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
                description: "If your feeling lost when going about working out and fitness then follow these TOP 10 TIPS that will make your workouts as product as possible. I give you the elite tactics that will change your workouts from good to great!!! ",
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
                description: " Weight Loss Blueprint gives you the advice and guidance to achieve your weight loss goals and become a better, happier, and healthier person. Losing weight is one thing but keeping it off is another. Weight Loss Blueprint gives you the knowledge to have a healthier lifestyle and keep weight off! ",
                sales: 7,
                percentOff: 0,
                categories: [7],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51K2lMxswOL._SX312_BO1,204,203,200_.jpg',
                releaseDate: 2017.02,
            },
            {
                author: 'Gillian Flynn',
                title: 'Dark Places',
                description: "Libby Day was seven when her mother and two sisters were murdered in “The Satan Sacrifice of Kinnakee, Kansas.” She survived—and famously testified that her fifteen-year-old brother, Ben, was the killer. Twenty-five years later, the Kill Club—a secret society obsessed with notorious crimes—locates Libby and pumps her for details. They hope to discover proof that may free Ben. Libby hopes to turn a profit off her tragic history: She’ll reconnect with the players from that night and report her findings to the club—for a fee. As Libby’s search takes her from shabby Missouri strip clubs to abandoned Oklahoma tourist towns, the unimaginable truth emerges, and Libby finds herself right back where she started—on the run from a killer.",
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
                description: "Three women, three men, connected through marriage or infidelity. Each is to blame for something. But only one is a killer in this nail-biting, stealthy psychological thriller about human frailty and obsession.",
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
                description: "When Margo Roth Spiegelman beckons Quentin Jacobsen in the middle of the night—dressed like a ninja and plotting an ingenious campaign of revenge—he follows her. Margo’s always planned extravagantly, and, until now, she’s always planned solo. After a lifetime of loving Margo from afar, things are finally looking up for Q . . . until day breaks and she has vanished. Always an enigma, Margo has now become a mystery. But there are clues. And they’re for Q.",
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
                description: "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel’s story is about to be completely rewritten.",
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
                description: "I'm stranded on Mars. I have no way to communicate with Earth. I'm in a Habitat designed to last 31 days. If the Oxygenator breaks down, I'll suffocate. If the Water Reclaimer breaks down, I'll die of thirst. If the Hab breaches, I'll just kind of explode. If none of those things happen, I'll eventually run out of food and starve to death. So yeah. I'm screwed.",
                price: 19.95,
                percentOff: 15,
                categories: [10],
                thumbUrl: 'http://ecx.images-amazon.com/images/I/51vvjWGOTYL._SX322_BO1,204,203,200_.jpg',
                releaseDate: 2015.08,
                sales: 6,
            },
            {
                author: 'Neal Stephenson',
                title: 'Seveneves: A Novel',
                description: "A catastrophic event renders the earth a ticking time bomb. In a feverish race against the inevitable, nations around the globe band together to devise an ambitious plan to ensure the survival of humanity far beyond our atmosphere, in outer space.",
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

        cart.addToCart = function (book, quantity, set, callback) {
            // Exclude 'set' for regular add to cart,
            // include to 'set' quantity, or use other
            // function.
            if (quantity === undefined || quantity === null) {
                quantity = 1;
            } else if (quantity <= 0) {
                quantity = 0;
            }
            var i = 0,
                len = cart.content.length,
                mod = false;
            for (i; i < len; i += 1) {
                if (JSON.stringify(
                        cart.content[i].book
                    ) === JSON.stringify(book)) {
                    mod = true;
                    if (!set) {
                        cart.content[i].quantity += quantity;
                    } else {
                        cart.content[i].quantity = quantity;
                        if (quantity === 0) {
                            cart.removeFromCart(book);
                        }
                    }
                    break;
                }
            }
            if (!mod) {
                cart.content.push(
                    {
                        quantity: quantity,
                        book: book,
                    }
                );
                i = cart.content.length - 1;
            }
            if (callback) {
                console.log('calling callback');
                callback(book.title, cart.content[i].quantity);
            }
        };

        cart.setQuantity = function (book, quantity) {
            if (!quantity) {
                quantity = 0;
            } else if (quantity <= 0) {
                quantity = 0;
            }

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

        cart.quantityOf = function (book) {
            var i = 0,
                len = cart.content.length;
            for (i; i < len; i += 1) {
                if (JSON.stringify(
                        cart.content[i].book
                    ) === JSON.stringify(book)) {
                    return cart.content[i].quantity;
                }
            }
            return 0;
        };

        cart.count = function () {
            var result = 0;
            if (!cart.content.length) {
                return 0;
            }
            for (var i = 0; i < cart.content.length; i++) {
                result += cart.content[i].quantity;
            }
            return result;
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
