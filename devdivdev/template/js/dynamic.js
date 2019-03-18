var url_string = window.location.href;
var url_param = new URL(url_string);
var idEtu = url_param.searchParams.get('id');

var arrVal = {
    'pas bon': 50,
    'trop fort': 60,
    mauvais: 5,
    génie: 100,
    médiocre: 10,
    'connais pas': 0
};
var url = 'http://localhost:8080/getcsv';
d3.csv(url, function(data) {
    //récupère le premier enregistrement
    //var d = data[0];
    //récupère l'enregistrement passé en get
    var d = idEtu ? data[idEtu] : data[0];

    //met à jour le nom
    d3.select(
        '#dummybodyid > div.resume > div.base > div.profile > div.info > h1'
    ).html(d['Prénom'] + ' ' + d.Nom);
    //met à jour les compétences informatiques
    var comp = d3.select('.skills-prog');
    //ajout du titre
    comp.append('h3').html("<i class='fas fa-code'></i>Langages informatiques");
    //ajout des compétences
    var ul = comp.append('ul');
    //selectionner les propriétés de : Vos compétences : langage informatique
    var tc = [];
    var c = 'Vos compétences : langage informatique';
    for (let p in d) {
        if (p.includes(c)) {
            let deb = p.indexOf('[');
            let fin = p.indexOf(']');
            let val = arrVal[d[p]];
            if (val > 0)
                tc.push({
                    lbl: p.substring(deb + 1, fin),
                    val: val
                });
        }
    }
    console.log(tc);
    var li = ul
        .selectAll('li')
        .data(tc)
        .enter()
        .append('li')
        .attr('data-percent', function(v) {
            return v.val;
        });
    li.append('span').html(function(c) {
        return c.lbl;
    });
    li.append('div')
        .attr('class', 'skills-bar')
        .append('div')
        .attr('class', 'bar');

    setAnimSkillProg();
});

d3.csv(url, data => {
    const work = d3.select('.work ul');
    let experiences = [];
    let year = 1;
    for (let experience in data[0]) {
        if (experience.includes(' Year : ')) {
            console.log(experience.startsWith(year));
            experiences.push(experience);
        }
    }
});
