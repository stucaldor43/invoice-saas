const { prisma } = require("./../prisma");

async function addClients(data, { user }) {
  const {
    firstName,
    lastName,
    companyName,
    email,
    clientType,
    address1,
    zipCode,
    city,
    state,
    phone,
  } = data;

  const client = await prisma.client.create({
    data: {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      clientType,
      userId: user.id,
      address: { create: { address1, zipCode, city, state } },
      companyName,
      phone,
    },
  });

  return client;
}

const clients = [
  {
    id: 1,
    firstName: "Avram",
    lastName: "Kubelka",
    email: "akubelka0@census.gov",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "6/15/2021",
    address1: "698 Pawling Point",
    zipCode: "50320",
    city: "Des Moines",
    state: "IA",
    fullName: "Avram Kubelka",
    phone: "515-856-3101",
  },
  {
    id: 2,
    firstName: "Adams",
    lastName: "Esselen",
    email: "aesselen1@cyberchimps.com",
    clientType: "COMPANY",
    companyName: "Murphy Inc",
    dateCreated: "8/15/2021",
    address1: "32655 Cody Lane",
    zipCode: "44705",
    city: "Canton",
    state: "OH",
    fullName: "Adams Esselen",
    phone: "330-280-0605",
  },
  {
    id: 3,
    firstName: "Germana",
    lastName: "Gohier",
    email: "ggohier2@alexa.com",
    clientType: "COMPANY",
    companyName: "Cruickshank, Medhurst and Bernhard",
    dateCreated: "12/18/2020",
    address1: "707 Clove Court",
    zipCode: "22184",
    city: "Vienna",
    state: "VA",
    fullName: "Germana Gohier",
    phone: "571-701-1195",
  },
  {
    id: 4,
    firstName: "Clarissa",
    lastName: "Atchly",
    email: "catchly3@surveymonkey.com",
    clientType: "COMPANY",
    companyName: "Fadel Inc",
    dateCreated: "5/13/2021",
    address1: "6212 Almo Park",
    zipCode: "90189",
    city: "Los Angeles",
    state: "CA",
    fullName: "Clarissa Atchly",
    phone: "213-876-0058",
  },
  {
    id: 5,
    firstName: "Cathleen",
    lastName: "Pring",
    email: "cpring4@instagram.com",
    clientType: "COMPANY",
    companyName: "Marvin-Mosciski",
    dateCreated: "11/2/2020",
    address1: "79671 Gina Parkway",
    zipCode: "20535",
    city: "Washington",
    state: "DC",
    fullName: "Cathleen Pring",
    phone: "202-282-5332",
  },
  {
    id: 6,
    firstName: "Haven",
    lastName: "Hutley",
    email: "hhutley5@i2i.jp",
    clientType: "COMPANY",
    companyName: "Prohaska Inc",
    dateCreated: "8/22/2021",
    address1: "8 3rd Court",
    zipCode: "22036",
    city: "Fairfax",
    state: "VA",
    fullName: "Haven Hutley",
    phone: "571-104-3739",
  },
  {
    id: 7,
    firstName: "Carney",
    lastName: "Eiler",
    email: "ceiler6@wikia.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "6/25/2021",
    address1: "0 Nevada Plaza",
    zipCode: "38126",
    city: "Memphis",
    state: "TN",
    fullName: "Carney Eiler",
    phone: "901-483-4872",
  },
  {
    id: 8,
    firstName: "Idell",
    lastName: "Stoak",
    email: "istoak7@rediff.com",
    clientType: "COMPANY",
    companyName: "Baumbach-Paucek",
    dateCreated: "8/3/2021",
    address1: "2374 Heffernan Hill",
    zipCode: "55585",
    city: "Monticello",
    state: "MN",
    fullName: "Idell Stoak",
    phone: "763-751-0986",
  },
  {
    id: 9,
    firstName: "Leslie",
    lastName: "Biasini",
    email: "lbiasini8@amazon.de",
    clientType: "COMPANY",
    companyName: "Stracke Inc",
    dateCreated: "9/19/2020",
    address1: "987 Elgar Way",
    zipCode: "94605",
    city: "Oakland",
    state: "CA",
    fullName: "Leslie Biasini",
    phone: "510-799-8098",
  },
  {
    id: 10,
    firstName: "Gus",
    lastName: "Alenikov",
    email: "galenikov9@exblog.jp",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "5/7/2021",
    address1: "92007 Pine View Pass",
    zipCode: "45454",
    city: "Dayton",
    state: "OH",
    fullName: "Gus Alenikov",
    phone: "937-211-6773",
  },
  {
    id: 11,
    firstName: "Merilee",
    lastName: "Corbert",
    email: "mcorberta@mlb.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "3/21/2021",
    address1: "33 Schmedeman Park",
    zipCode: "78759",
    city: "Austin",
    state: "TX",
    fullName: "Merilee Corbert",
    phone: "512-181-8249",
  },
  {
    id: 12,
    firstName: "Christabella",
    lastName: "Romei",
    email: "cromeib@google.de",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "1/9/2021",
    address1: "38027 Namekagon Way",
    zipCode: "75231",
    city: "Dallas",
    state: "TX",
    fullName: "Christabella Romei",
    phone: "469-908-6974",
  },
  {
    id: 13,
    firstName: "Todd",
    lastName: "Bellay",
    email: "tbellayc@pcworld.com",
    clientType: "COMPANY",
    companyName: "Funk-Goodwin",
    dateCreated: "4/3/2021",
    address1: "69 Prairie Rose Trail",
    zipCode: "49510",
    city: "Grand Rapids",
    state: "MI",
    fullName: "Todd Bellay",
    phone: "616-400-3026",
  },
  {
    id: 14,
    firstName: "Antonino",
    lastName: "Boldero",
    email: "abolderod@hp.com",
    clientType: "COMPANY",
    companyName: "Bradtke LLC",
    dateCreated: "10/6/2020",
    address1: "7784 Dryden Center",
    zipCode: "13505",
    city: "Utica",
    state: "NY",
    fullName: "Antonino Boldero",
    phone: "315-369-6117",
  },
  {
    id: 15,
    firstName: "Bale",
    lastName: "Yourell",
    email: "byourelle@barnesandnoble.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "9/8/2021",
    address1: "8 Springs Avenue",
    zipCode: "23605",
    city: "Newport News",
    state: "VA",
    fullName: "Bale Yourell",
    phone: "757-292-1808",
  },
  {
    id: 16,
    firstName: "Katharyn",
    lastName: "Zavattieri",
    email: "kzavattierif@latimes.com",
    clientType: "COMPANY",
    companyName: "Boyer LLC",
    dateCreated: "9/10/2021",
    address1: "3563 Warbler Junction",
    zipCode: "46247",
    city: "Indianapolis",
    state: "IN",
    fullName: "Katharyn Zavattieri",
    phone: "317-416-2847",
  },
  {
    id: 17,
    firstName: "Betta",
    lastName: "Mishaw",
    email: "bmishawg@shop-pro.jp",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "6/23/2021",
    address1: "084 Haas Court",
    zipCode: "95205",
    city: "Stockton",
    state: "CA",
    fullName: "Betta Mishaw",
    phone: "209-309-2130",
  },
  {
    id: 18,
    firstName: "Merline",
    lastName: "Beardall",
    email: "mbeardallh@1688.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "8/14/2021",
    address1: "4 Thackeray Crossing",
    zipCode: "06152",
    city: "Hartford",
    state: "CT",
    fullName: "Merline Beardall",
    phone: "860-637-4293",
  },
  {
    id: 19,
    firstName: "Cristi",
    lastName: "Judgkins",
    email: "cjudgkinsi@phoca.cz",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "7/25/2021",
    address1: "2684 Esch Center",
    zipCode: "60641",
    city: "Chicago",
    state: "IL",
    fullName: "Cristi Judgkins",
    phone: "630-364-6297",
  },
  {
    id: 20,
    firstName: "Wilmette",
    lastName: "Steggals",
    email: "wsteggalsj@hao123.com",
    clientType: "COMPANY",
    companyName: "Howell, Batz and Feil",
    dateCreated: "3/14/2021",
    address1: "4 Kedzie Hill",
    zipCode: "31410",
    city: "Savannah",
    state: "GA",
    fullName: "Wilmette Steggals",
    phone: "912-162-3201",
  },
  {
    id: 21,
    firstName: "Karalynn",
    lastName: "Lomath",
    email: "klomathk@reddit.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "1/26/2021",
    address1: "712 Dryden Hill",
    zipCode: "37245",
    city: "Nashville",
    state: "TN",
    fullName: "Karalynn Lomath",
    phone: "615-536-2029",
  },
  {
    id: 22,
    firstName: "Tades",
    lastName: "Gibbens",
    email: "tgibbensl@google.de",
    clientType: "COMPANY",
    companyName: "Oberbrunner-Crist",
    dateCreated: "11/27/2020",
    address1: "5224 Erie Plaza",
    zipCode: "16510",
    city: "Erie",
    state: "PA",
    fullName: "Tades Gibbens",
    phone: "814-548-3561",
  },
  {
    id: 23,
    firstName: "Allene",
    lastName: "Norwich",
    email: "anorwichm@google.de",
    clientType: "COMPANY",
    companyName: "Breitenberg, Fahey and O'Connell",
    dateCreated: "7/25/2021",
    address1: "8 Delaware Court",
    zipCode: "37931",
    city: "Knoxville",
    state: "TN",
    fullName: "Allene Norwich",
    phone: "865-771-5747",
  },
  {
    id: 24,
    firstName: "Margareta",
    lastName: "McCuthais",
    email: "mmccuthaisn@canalblog.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "11/11/2020",
    address1: "035 Susan Alley",
    zipCode: "48242",
    city: "Detroit",
    state: "MI",
    fullName: "Margareta McCuthais",
    phone: "313-715-3102",
  },
  {
    id: 25,
    firstName: "Selia",
    lastName: "Ferrar",
    email: "sferraro@mapy.cz",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "5/26/2021",
    address1: "65476 Carioca Drive",
    zipCode: "88579",
    city: "El Paso",
    state: "TX",
    fullName: "Selia Ferrar",
    phone: "915-881-9017",
  },
  {
    id: 26,
    firstName: "Rycca",
    lastName: "Arondel",
    email: "rarondelp@360.cn",
    clientType: "COMPANY",
    companyName: "McClure-Brakus",
    dateCreated: "5/31/2021",
    address1: "12778 Hintze Street",
    zipCode: "02119",
    city: "Boston",
    state: "MA",
    fullName: "Rycca Arondel",
    phone: "508-871-4533",
  },
  {
    id: 27,
    firstName: "Hilton",
    lastName: "Bauldrey",
    email: "hbauldreyq@example.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "9/2/2021",
    address1: "1 David Court",
    zipCode: "71166",
    city: "Shreveport",
    state: "LA",
    fullName: "Hilton Bauldrey",
    phone: "318-474-7157",
  },
  {
    id: 28,
    firstName: "Selene",
    lastName: "Joliffe",
    email: "sjoliffer@slate.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "8/28/2021",
    address1: "4169 Northridge Center",
    zipCode: "79923",
    city: "El Paso",
    state: "TX",
    fullName: "Selene Joliffe",
    phone: "915-507-5141",
  },
  {
    id: 29,
    firstName: "Noni",
    lastName: "Talks",
    email: "ntalkss@moonfruit.com",
    clientType: "COMPANY",
    companyName: "Leuschke, Koch and Batz",
    dateCreated: "10/20/2020",
    address1: "1 Northridge Avenue",
    zipCode: "11241",
    city: "Brooklyn",
    state: "NY",
    fullName: "Noni Talks",
    phone: "347-866-2669",
  },
  {
    id: 30,
    firstName: "Timothea",
    lastName: "Ghirardi",
    email: "tghirardit@ucoz.ru",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "5/4/2021",
    address1: "3 Amoth Park",
    zipCode: "80310",
    city: "Boulder",
    state: "CO",
    fullName: "Timothea Ghirardi",
    phone: "303-108-7578",
  },
  {
    id: 31,
    firstName: "Gwenora",
    lastName: "Schuricke",
    email: "gschurickeu@google.de",
    clientType: "COMPANY",
    companyName: "Keeling-Fisher",
    dateCreated: "6/14/2021",
    address1: "990 Spaight Place",
    zipCode: "84199",
    city: "Salt Lake City",
    state: "UT",
    fullName: "Gwenora Schuricke",
    phone: "801-932-0972",
  },
  {
    id: 32,
    firstName: "Jacqui",
    lastName: "Gandar",
    email: "jgandarv@exblog.jp",
    clientType: "COMPANY",
    companyName: "O'Keefe, Pfeffer and Miller",
    dateCreated: "8/19/2021",
    address1: "01 Redwing Alley",
    zipCode: "94263",
    city: "Sacramento",
    state: "CA",
    fullName: "Jacqui Gandar",
    phone: "916-475-3623",
  },
  {
    id: 33,
    firstName: "Joete",
    lastName: "Hoyland",
    email: "jhoylandw@soundcloud.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "4/22/2021",
    address1: "8 Rigney Parkway",
    zipCode: "19605",
    city: "Reading",
    state: "PA",
    fullName: "Joete Hoyland",
    phone: "610-148-7613",
  },
  {
    id: 34,
    firstName: "Gale",
    lastName: "Thorlby",
    email: "gthorlbyx@unesco.org",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "8/24/2021",
    address1: "69114 Ilene Junction",
    zipCode: "63104",
    city: "Saint Louis",
    state: "MO",
    fullName: "Gale Thorlby",
    phone: "314-558-0303",
  },
  {
    id: 35,
    firstName: "Diann",
    lastName: "Makin",
    email: "dmakiny@psu.edu",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "6/3/2021",
    address1: "4 Cherokee Hill",
    zipCode: "80310",
    city: "Boulder",
    state: "CO",
    fullName: "Diann Makin",
    phone: "303-349-7810",
  },
  {
    id: 36,
    firstName: "Aleen",
    lastName: "Saltsberg",
    email: "asaltsbergz@mac.com",
    clientType: "COMPANY",
    companyName: "Muller and Sons",
    dateCreated: "2/8/2021",
    address1: "6231 Fallview Hill",
    zipCode: "46231",
    city: "Indianapolis",
    state: "IN",
    fullName: "Aleen Saltsberg",
    phone: "317-789-9841",
  },
  {
    id: 37,
    firstName: "Kory",
    lastName: "Fulleylove",
    email: "kfulleylove10@domainmarket.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "11/3/2020",
    address1: "12252 Old Shore Junction",
    zipCode: "89714",
    city: "Carson City",
    state: "NV",
    fullName: "Kory Fulleylove",
    phone: "775-932-9448",
  },
  {
    id: 38,
    firstName: "Fairfax",
    lastName: "Need",
    email: "fneed11@guardian.co.uk",
    clientType: "COMPANY",
    companyName: "Tromp-Blanda",
    dateCreated: "5/28/2021",
    address1: "676 Schlimgen Circle",
    zipCode: "71137",
    city: "Shreveport",
    state: "LA",
    fullName: "Fairfax Need",
    phone: "318-130-2220",
  },
  {
    id: 39,
    firstName: "Fancy",
    lastName: "Hoxey",
    email: "fhoxey12@123-reg.co.uk",
    clientType: "COMPANY",
    companyName: "Maggio Group",
    dateCreated: "4/12/2021",
    address1: "175 Park Meadow Plaza",
    zipCode: "29225",
    city: "Columbia",
    state: "SC",
    fullName: "Fancy Hoxey",
    phone: "803-154-6301",
  },
  {
    id: 40,
    firstName: "Ursala",
    lastName: "Mort",
    email: "umort13@unblog.fr",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "6/2/2021",
    address1: "828 Hoffman Way",
    zipCode: "85035",
    city: "Phoenix",
    state: "AZ",
    fullName: "Ursala Mort",
    phone: "623-210-2575",
  },
  {
    id: 41,
    firstName: "Piotr",
    lastName: "Collinson",
    email: "pcollinson14@intel.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "11/5/2020",
    address1: "43619 Derek Circle",
    zipCode: "14624",
    city: "Rochester",
    state: "NY",
    fullName: "Piotr Collinson",
    phone: "585-477-6087",
  },
  {
    id: 42,
    firstName: "Charissa",
    lastName: "Fulmen",
    email: "cfulmen15@ycombinator.com",
    clientType: "COMPANY",
    companyName: "Trantow and Sons",
    dateCreated: "10/15/2020",
    address1: "9632 Esker Avenue",
    zipCode: "29203",
    city: "Columbia",
    state: "SC",
    fullName: "Charissa Fulmen",
    phone: "803-356-7379",
  },
  {
    id: 43,
    firstName: "Doro",
    lastName: "Matijevic",
    email: "dmatijevic16@amazon.co.uk",
    clientType: "COMPANY",
    companyName: "Gorczany LLC",
    dateCreated: "3/13/2021",
    address1: "738 Bonner Court",
    zipCode: "23668",
    city: "Hampton",
    state: "VA",
    fullName: "Doro Matijevic",
    phone: "757-680-3934",
  },
  {
    id: 44,
    firstName: "Chas",
    lastName: "Garrand",
    email: "cgarrand17@huffingtonpost.com",
    clientType: "COMPANY",
    companyName: "Welch, Tromp and Hartmann",
    dateCreated: "1/5/2021",
    address1: "42 Hagan Crossing",
    zipCode: "19184",
    city: "Philadelphia",
    state: "PA",
    fullName: "Chas Garrand",
    phone: "215-885-8149",
  },
  {
    id: 45,
    firstName: "Frank",
    lastName: "Steuhlmeyer",
    email: "fsteuhlmeyer18@macromedia.com",
    clientType: "COMPANY",
    companyName: "Kris, Bruen and Lowe",
    dateCreated: "4/5/2021",
    address1: "3235 Evergreen Alley",
    zipCode: "11470",
    city: "Jamaica",
    state: "NY",
    fullName: "Frank Steuhlmeyer",
    phone: "917-318-4553",
  },
  {
    id: 46,
    firstName: "Dinah",
    lastName: "Bielfelt",
    email: "dbielfelt19@macromedia.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "10/2/2020",
    address1: "9 Bultman Alley",
    zipCode: "66112",
    city: "Kansas City",
    state: "KS",
    fullName: "Dinah Bielfelt",
    phone: "816-128-0713",
  },
  {
    id: 47,
    firstName: "Laurie",
    lastName: "Delieu",
    email: "ldelieu1a@google.ru",
    clientType: "COMPANY",
    companyName: "Swaniawski and Sons",
    dateCreated: "1/9/2021",
    address1: "9 Northridge Circle",
    zipCode: "93311",
    city: "Bakersfield",
    state: "CA",
    fullName: "Laurie Delieu",
    phone: "805-357-4162",
  },
  {
    id: 48,
    firstName: "Tate",
    lastName: "Gasking",
    email: "tgasking1b@trellian.com",
    clientType: "COMPANY",
    companyName: "Johns-Howe",
    dateCreated: "12/14/2020",
    address1: "12 Emmet Court",
    zipCode: "35905",
    city: "Gadsden",
    state: "AL",
    fullName: "Tate Gasking",
    phone: "256-714-3112",
  },
  {
    id: 49,
    firstName: "Ruttger",
    lastName: "Cisco",
    email: "rcisco1c@ucoz.com",
    clientType: "COMPANY",
    companyName: "Howell, Mueller and Hodkiewicz",
    dateCreated: "3/17/2021",
    address1: "78614 Green Center",
    zipCode: "45254",
    city: "Cincinnati",
    state: "OH",
    fullName: "Ruttger Cisco",
    phone: "513-437-0610",
  },
  {
    id: 50,
    firstName: "Nessie",
    lastName: "Renfrew",
    email: "nrenfrew1d@census.gov",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "6/20/2021",
    address1: "1 Lawn Trail",
    zipCode: "10557",
    city: "Mount Vernon",
    state: "NY",
    fullName: "Nessie Renfrew",
    phone: "914-718-3351",
  },
  {
    id: 51,
    firstName: "Ira",
    lastName: "Slucock",
    email: "islucock1e@state.tx.us",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "2/23/2021",
    address1: "293 Dahle Terrace",
    zipCode: "62711",
    city: "Springfield",
    state: "IL",
    fullName: "Ira Slucock",
    phone: "217-765-2203",
  },
  {
    id: 52,
    firstName: "Sergent",
    lastName: "Blankenship",
    email: "sblankenship1f@mapquest.com",
    clientType: "COMPANY",
    companyName: "Schultz, Barton and Torp",
    dateCreated: "12/18/2020",
    address1: "32384 Spohn Street",
    zipCode: "29203",
    city: "Columbia",
    state: "SC",
    fullName: "Sergent Blankenship",
    phone: "803-392-1999",
  },
  {
    id: 53,
    firstName: "Marty",
    lastName: "Ourry",
    email: "mourry1g@linkedin.com",
    clientType: "COMPANY",
    companyName: "Swaniawski, Botsford and Pollich",
    dateCreated: "4/2/2021",
    address1: "9 Southridge Junction",
    zipCode: "20546",
    city: "Washington",
    state: "DC",
    fullName: "Marty Ourry",
    phone: "202-434-6633",
  },
  {
    id: 54,
    firstName: "Mordecai",
    lastName: "Varnals",
    email: "mvarnals1h@xinhuanet.com",
    clientType: "COMPANY",
    companyName: "Hamill, Fadel and Emard",
    dateCreated: "2/2/2021",
    address1: "1 Meadow Vale Point",
    zipCode: "46247",
    city: "Indianapolis",
    state: "IN",
    fullName: "Mordecai Varnals",
    phone: "317-706-6850",
  },
  {
    id: 55,
    firstName: "Antonie",
    lastName: "Hollebon",
    email: "ahollebon1i@bluehost.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "2/16/2021",
    address1: "3015 Moose Drive",
    zipCode: "71914",
    city: "Hot Springs National Park",
    state: "AR",
    fullName: "Antonie Hollebon",
    phone: "501-496-7501",
  },
  {
    id: 56,
    firstName: "Gage",
    lastName: "Pedroli",
    email: "gpedroli1j@is.gd",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "5/5/2021",
    address1: "78847 Iowa Lane",
    zipCode: "85067",
    city: "Phoenix",
    state: "AZ",
    fullName: "Gage Pedroli",
    phone: "602-365-8926",
  },
  {
    id: 57,
    firstName: "Buddie",
    lastName: "Shackleton",
    email: "bshackleton1k@columbia.edu",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "2/20/2021",
    address1: "475 International Street",
    zipCode: "25726",
    city: "Huntington",
    state: "WV",
    fullName: "Buddie Shackleton",
    phone: "304-237-5325",
  },
  {
    id: 58,
    firstName: "Aurie",
    lastName: "Issit",
    email: "aissit1l@ameblo.jp",
    clientType: "COMPANY",
    companyName: "Hyatt and Sons",
    dateCreated: "3/27/2021",
    address1: "80983 Nova Court",
    zipCode: "27415",
    city: "Greensboro",
    state: "NC",
    fullName: "Aurie Issit",
    phone: "336-222-4269",
  },
  {
    id: 59,
    firstName: "Robinia",
    lastName: "Dreher",
    email: "rdreher1m@si.edu",
    clientType: "COMPANY",
    companyName: "Gleason-Torphy",
    dateCreated: "6/11/2021",
    address1: "76 Annamark Lane",
    zipCode: "75323",
    city: "Dallas",
    state: "TX",
    fullName: "Robinia Dreher",
    phone: "214-770-6962",
  },
  {
    id: 60,
    firstName: "Marietta",
    lastName: "Kleis",
    email: "mkleis1n@wordpress.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "10/21/2020",
    address1: "5380 Clyde Gallagher Terrace",
    zipCode: "20883",
    city: "Gaithersburg",
    state: "MD",
    fullName: "Marietta Kleis",
    phone: "240-509-8994",
  },
  {
    id: 61,
    firstName: "Malcolm",
    lastName: "Varren",
    email: "mvarren1o@kickstarter.com",
    clientType: "COMPANY",
    companyName: "Grimes and Sons",
    dateCreated: "8/4/2021",
    address1: "304 Victoria Way",
    zipCode: "90025",
    city: "Los Angeles",
    state: "CA",
    fullName: "Malcolm Varren",
    phone: "323-874-3174",
  },
  {
    id: 62,
    firstName: "Ardene",
    lastName: "Bunton",
    email: "abunton1p@indiegogo.com",
    clientType: "COMPANY",
    companyName: "Fritsch Group",
    dateCreated: "11/14/2020",
    address1: "1 Rutledge Alley",
    zipCode: "66215",
    city: "Shawnee Mission",
    state: "KS",
    fullName: "Ardene Bunton",
    phone: "913-304-2435",
  },
  {
    id: 63,
    firstName: "Isidora",
    lastName: "Piperley",
    email: "ipiperley1q@state.gov",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "3/22/2021",
    address1: "4401 Parkside Place",
    zipCode: "97221",
    city: "Portland",
    state: "OR",
    fullName: "Isidora Piperley",
    phone: "503-653-2005",
  },
  {
    id: 64,
    firstName: "Emmi",
    lastName: "Cotherill",
    email: "ecotherill1r@wisc.edu",
    clientType: "COMPANY",
    companyName: "Goodwin-Botsford",
    dateCreated: "8/30/2021",
    address1: "846 Vahlen Park",
    zipCode: "89125",
    city: "Las Vegas",
    state: "NV",
    fullName: "Emmi Cotherill",
    phone: "702-773-9981",
  },
  {
    id: 65,
    firstName: "Kathleen",
    lastName: "Windless",
    email: "kwindless1s@shareasale.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "9/2/2021",
    address1: "65289 Forest Dale Crossing",
    zipCode: "63131",
    city: "Saint Louis",
    state: "MO",
    fullName: "Kathleen Windless",
    phone: "636-343-8242",
  },
  {
    id: 66,
    firstName: "Putnem",
    lastName: "Zienkiewicz",
    email: "pzienkiewicz1t@shop-pro.jp",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "10/18/2020",
    address1: "624 Stoughton Road",
    zipCode: "30386",
    city: "Atlanta",
    state: "GA",
    fullName: "Putnem Zienkiewicz",
    phone: "404-860-5157",
  },
  {
    id: 67,
    firstName: "Sholom",
    lastName: "Windrum",
    email: "swindrum1u@marriott.com",
    clientType: "COMPANY",
    companyName: "Koepp-Ziemann",
    dateCreated: "9/11/2021",
    address1: "20780 Veith Drive",
    zipCode: "94975",
    city: "Petaluma",
    state: "CA",
    fullName: "Sholom Windrum",
    phone: "707-585-1207",
  },
  {
    id: 68,
    firstName: "Malinda",
    lastName: "Thow",
    email: "mthow1v@csmonitor.com",
    clientType: "COMPANY",
    companyName: "Thiel, Bartoletti and Stamm",
    dateCreated: "3/17/2021",
    address1: "38 Waywood Center",
    zipCode: "88569",
    city: "El Paso",
    state: "TX",
    fullName: "Malinda Thow",
    phone: "915-872-7674",
  },
  {
    id: 69,
    firstName: "Electra",
    lastName: "Toffaloni",
    email: "etoffaloni1w@reddit.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "5/16/2021",
    address1: "120 Helena Avenue",
    zipCode: "65898",
    city: "Springfield",
    state: "MO",
    fullName: "Electra Toffaloni",
    phone: "417-268-7236",
  },
  {
    id: 70,
    firstName: "Eimile",
    lastName: "Mulcaster",
    email: "emulcaster1x@walmart.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "10/20/2020",
    address1: "10204 Crescent Oaks Parkway",
    zipCode: "77844",
    city: "College Station",
    state: "TX",
    fullName: "Eimile Mulcaster",
    phone: "979-849-7435",
  },
  {
    id: 71,
    firstName: "Inesita",
    lastName: "Strivens",
    email: "istrivens1y@go.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "1/5/2021",
    address1: "19912 Lakewood Crossing",
    zipCode: "19131",
    city: "Philadelphia",
    state: "PA",
    fullName: "Inesita Strivens",
    phone: "215-521-4176",
  },
  {
    id: 72,
    firstName: "Toby",
    lastName: "Kyngdon",
    email: "tkyngdon1z@sphinn.com",
    clientType: "COMPANY",
    companyName: "Bradtke, Stroman and Leuschke",
    dateCreated: "9/18/2020",
    address1: "58488 Homewood Way",
    zipCode: "78744",
    city: "Austin",
    state: "TX",
    fullName: "Toby Kyngdon",
    phone: "361-661-9643",
  },
  {
    id: 73,
    firstName: "Thadeus",
    lastName: "Rosenhaupt",
    email: "trosenhaupt20@so-net.ne.jp",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "2/9/2021",
    address1: "96570 Darwin Court",
    zipCode: "02124",
    city: "Boston",
    state: "MA",
    fullName: "Thadeus Rosenhaupt",
    phone: "617-218-5449",
  },
  {
    id: 74,
    firstName: "Stanfield",
    lastName: "Bower",
    email: "sbower21@wiley.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "5/26/2021",
    address1: "10 Grasskamp Alley",
    zipCode: "72916",
    city: "Fort Smith",
    state: "AR",
    fullName: "Stanfield Bower",
    phone: "479-311-9805",
  },
  {
    id: 75,
    firstName: "Reeba",
    lastName: "Coatts",
    email: "rcoatts22@g.co",
    clientType: "COMPANY",
    companyName: "Smith-Bernhard",
    dateCreated: "6/3/2021",
    address1: "816 Evergreen Crossing",
    zipCode: "31998",
    city: "Columbus",
    state: "GA",
    fullName: "Reeba Coatts",
    phone: "706-110-6448",
  },
  {
    id: 76,
    firstName: "Arabel",
    lastName: "Howen",
    email: "ahowen23@google.nl",
    clientType: "COMPANY",
    companyName: "Daugherty-Gerhold",
    dateCreated: "3/19/2021",
    address1: "7 Lakewood Pass",
    zipCode: "77045",
    city: "Houston",
    state: "TX",
    fullName: "Arabel Howen",
    phone: "281-152-4046",
  },
  {
    id: 77,
    firstName: "Jolie",
    lastName: "Towne",
    email: "jtowne24@tripod.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "9/15/2020",
    address1: "9864 Coolidge Park",
    zipCode: "33283",
    city: "Miami",
    state: "FL",
    fullName: "Jolie Towne",
    phone: "305-599-9784",
  },
  {
    id: 78,
    firstName: "Adiana",
    lastName: "Stannah",
    email: "astannah25@ow.ly",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "6/24/2021",
    address1: "91 Orin Road",
    zipCode: "35215",
    city: "Birmingham",
    state: "AL",
    fullName: "Adiana Stannah",
    phone: "205-158-5284",
  },
  {
    id: 79,
    firstName: "Adan",
    lastName: "Strongitharm",
    email: "astrongitharm26@cisco.com",
    clientType: "COMPANY",
    companyName: "Monahan, Runte and Feest",
    dateCreated: "5/14/2021",
    address1: "6533 Pierstorff Point",
    zipCode: "33028",
    city: "Hollywood",
    state: "FL",
    fullName: "Adan Strongitharm",
    phone: "305-319-5358",
  },
  {
    id: 80,
    firstName: "Solly",
    lastName: "Gaishson",
    email: "sgaishson27@liveinternet.ru",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "7/18/2021",
    address1: "35 Lukken Place",
    zipCode: "79911",
    city: "El Paso",
    state: "TX",
    fullName: "Solly Gaishson",
    phone: "915-433-6177",
  },
  {
    id: 81,
    firstName: "Rab",
    lastName: "Smoote",
    email: "rsmoote28@qq.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "9/2/2021",
    address1: "8 Novick Junction",
    zipCode: "33315",
    city: "Fort Lauderdale",
    state: "FL",
    fullName: "Rab Smoote",
    phone: "954-976-5428",
  },
  {
    id: 82,
    firstName: "Tamqrah",
    lastName: "MacCardle",
    email: "tmaccardle29@examiner.com",
    clientType: "COMPANY",
    companyName: "Collins and Sons",
    dateCreated: "11/8/2020",
    address1: "26773 Atwood Parkway",
    zipCode: "12227",
    city: "Albany",
    state: "NY",
    fullName: "Tamqrah MacCardle",
    phone: "518-805-0424",
  },
  {
    id: 83,
    firstName: "Ailsun",
    lastName: "Dibley",
    email: "adibley2a@gov.uk",
    clientType: "COMPANY",
    companyName: "Ernser, Volkman and Cartwright",
    dateCreated: "12/2/2020",
    address1: "58 Merry Parkway",
    zipCode: "37914",
    city: "Knoxville",
    state: "TN",
    fullName: "Ailsun Dibley",
    phone: "865-282-5762",
  },
  {
    id: 84,
    firstName: "Tish",
    lastName: "Le Fevre",
    email: "tlefevre2b@weibo.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "2/10/2021",
    address1: "4 Grim Court",
    zipCode: "28815",
    city: "Asheville",
    state: "NC",
    fullName: "Tish Le Fevre",
    phone: "828-283-6833",
  },
  {
    id: 85,
    firstName: "Karl",
    lastName: "Greep",
    email: "kgreep2c@vk.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "7/25/2021",
    address1: "54 Burrows Trail",
    zipCode: "37235",
    city: "Nashville",
    state: "TN",
    fullName: "Karl Greep",
    phone: "615-543-2175",
  },
  {
    id: 86,
    firstName: "Janina",
    lastName: "Jacquemot",
    email: "jjacquemot2d@amazonaws.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "7/9/2021",
    address1: "5155 Morningstar Road",
    zipCode: "80930",
    city: "Colorado Springs",
    state: "CO",
    fullName: "Janina Jacquemot",
    phone: "719-880-5267",
  },
  {
    id: 87,
    firstName: "Paulo",
    lastName: "Ciottoi",
    email: "pciottoi2e@com.com",
    clientType: "COMPANY",
    companyName: "Jast-Satterfield",
    dateCreated: "4/17/2021",
    address1: "4361 Banding Road",
    zipCode: "32128",
    city: "Daytona Beach",
    state: "FL",
    fullName: "Paulo Ciottoi",
    phone: "386-937-9463",
  },
  {
    id: 88,
    firstName: "Rina",
    lastName: "Larderot",
    email: "rlarderot2f@vinaora.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "12/18/2020",
    address1: "43238 Hagan Parkway",
    zipCode: "56372",
    city: "Saint Cloud",
    state: "MN",
    fullName: "Rina Larderot",
    phone: "320-659-7065",
  },
  {
    id: 89,
    firstName: "Aldin",
    lastName: "O' Bee",
    email: "aobee2g@cdbaby.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "10/4/2020",
    address1: "8 Hoffman Plaza",
    zipCode: "10454",
    city: "Bronx",
    state: "NY",
    fullName: "Aldin O' Bee",
    phone: "718-610-9602",
  },
  {
    id: 90,
    firstName: "Ernie",
    lastName: "Preuvost",
    email: "epreuvost2h@cargocollective.com",
    clientType: "COMPANY",
    companyName: "Leannon Group",
    dateCreated: "11/29/2020",
    address1: "4 Gerald Alley",
    zipCode: "89505",
    city: "Reno",
    state: "NV",
    fullName: "Ernie Preuvost",
    phone: "775-225-0588",
  },
  {
    id: 91,
    firstName: "Maureene",
    lastName: "Shorey",
    email: "mshorey2i@delicious.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "7/2/2021",
    address1: "742 Fallview Avenue",
    zipCode: "14604",
    city: "Rochester",
    state: "NY",
    fullName: "Maureene Shorey",
    phone: "585-397-4618",
  },
  {
    id: 92,
    firstName: "Ami",
    lastName: "MacKereth",
    email: "amackereth2j@geocities.jp",
    clientType: "COMPANY",
    companyName: "West-Legros",
    dateCreated: "5/31/2021",
    address1: "43 Scott Drive",
    zipCode: "79171",
    city: "Amarillo",
    state: "TX",
    fullName: "Ami MacKereth",
    phone: "806-817-6685",
  },
  {
    id: 93,
    firstName: "Biddie",
    lastName: "Ganniclifft",
    email: "bganniclifft2k@nymag.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "9/26/2020",
    address1: "448 Lakewood Gardens Road",
    zipCode: "96835",
    city: "Honolulu",
    state: "HI",
    fullName: "Biddie Ganniclifft",
    phone: "808-743-1949",
  },
  {
    id: 94,
    firstName: "Kirsteni",
    lastName: "Freschi",
    email: "kfreschi2l@nature.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "10/21/2020",
    address1: "59 Ohio Plaza",
    zipCode: "46896",
    city: "Fort Wayne",
    state: "IN",
    fullName: "Kirsteni Freschi",
    phone: "260-107-3794",
  },
  {
    id: 95,
    firstName: "Roscoe",
    lastName: "Gaynesford",
    email: "rgaynesford2m@github.com",
    clientType: "COMPANY",
    companyName: "Blick and Sons",
    dateCreated: "1/3/2021",
    address1: "48 Hagan Lane",
    zipCode: "33763",
    city: "Clearwater",
    state: "FL",
    fullName: "Roscoe Gaynesford",
    phone: "727-807-3685",
  },
  {
    id: 96,
    firstName: "Quintin",
    lastName: "Wardhaugh",
    email: "qwardhaugh2n@businessinsider.com",
    clientType: "COMPANY",
    companyName: "Ortiz-Ondricka",
    dateCreated: "6/19/2021",
    address1: "113 Buhler Avenue",
    zipCode: "38197",
    city: "Memphis",
    state: "TN",
    fullName: "Quintin Wardhaugh",
    phone: "901-856-5436",
  },
  {
    id: 97,
    firstName: "Gard",
    lastName: "Bome",
    email: "gbome2o@posterous.com",
    clientType: "COMPANY",
    companyName: "Dach LLC",
    dateCreated: "3/25/2021",
    address1: "6674 Canary Parkway",
    zipCode: "81015",
    city: "Pueblo",
    state: "CO",
    fullName: "Gard Bome",
    phone: "719-517-5319",
  },
  {
    id: 98,
    firstName: "Lucho",
    lastName: "Ridpath",
    email: "lridpath2p@mapquest.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "8/5/2021",
    address1: "6 Eagle Crest Junction",
    zipCode: "33164",
    city: "Miami",
    state: "FL",
    fullName: "Lucho Ridpath",
    phone: "786-270-3796",
  },
  {
    id: 99,
    firstName: "Josee",
    lastName: "Wyd",
    email: "jwyd2q@com.com",
    clientType: "INDIVIDUAL",
    companyName: null,
    dateCreated: "1/16/2021",
    address1: "30699 Sherman Drive",
    zipCode: "23260",
    city: "Richmond",
    state: "VA",
    fullName: "Josee Wyd",
    phone: "804-628-7400",
  },
  {
    id: 100,
    firstName: "Jacquelynn",
    lastName: "McDoual",
    email: "jmcdoual2r@storify.com",
    clientType: "COMPANY",
    companyName: "Bins-Swift",
    dateCreated: "2/4/2021",
    address1: "7599 Elgar Hill",
    zipCode: "36134",
    city: "Montgomery",
    state: "AL",
    fullName: "Jacquelynn McDoual",
    phone: "334-378-7307",
  },
];

async function seedClients() {
  return Promise.all(
    clients.map((c) => addClients(c, { user: { id: 4 } }))
  ).then((values) => (process.exitCode = 1));
}

seedClients()
  .then(() => {
    console.log("seeded clients");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    process.exit(0);
  });

module.exports = {
  seedClients
}
