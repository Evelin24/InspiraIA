// Inicializa o mapa
const map = L.map('map').setView([-14.2794, -39.0007], 6.5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Cria o conteúdo HTML do popup com slider sem botões
function createPopup(id, title, images, description) {
  const imgsHtml = images.map((src, i) =>
    `<img src="${src}" id="img-${id}-${i}" alt="${title}" class="${i === 0 ? 'active' : ''}" style="width: 100%; margin-bottom: 10px; border-radius: 8px;">`
  ).join('');

  return `
    <div class="popup-content">
        <strong>${title}</strong>
        <div class="image-slider" id="slider-${id}" style="overflow-x: auto; overflow-y: hidden; white-space: nowrap;">
        ${imgsHtml}
        </div>
        <div class="description">${description}</div>
    </div>
    `;
}



// Dados dos locais
const locations = [
  {
    id: 'salvador',
    coords: [-13.00186, -38.53273],
    title: "Forte São Diogo/ Espaço Carybé - Salvador",
    images: ['images/fortesaodiogo1.jpg', 'images/fortesaodiogo2.jpg','images/fortesaodiogo3.jpg', 'images/fortesaodiogo4.jpg'],
    desc: 'O Forte de São Diogo, localizado na Barra em Salvador, abriga o Espaço Carybé de Artes, um centro cultural que homenageia o artista argentino-brasileiro Carybé. Integrando história e arte, o espaço combina a arquitetura militar do século XVII com exposições interativas e recursos multimídia sobre a vida e obra do artista. Além disso, o forte oferece uma vista privilegiada da Baía de Todos-os-Santos, sendo um ponto turístico que une patrimônio histórico, cultura e contemplação.'
  },
  {
    id: 'salvador',
    coords: [-12.9790, -38.5160],
    title: "Museu de Arte Sacra da UFBA - Salvador",
    images: ['images/museudaartesacra1.jpg', 'images/museudaartesacra2.jpg','images/museudaartesacra3.jpg','images/museudaartesacra4.jpg', 'images/museudaartesacra5.jpg', 'images/museudaartesacra6.jpg'],
    desc: 'O Museu Carlos Costa Pinto está instalado em uma elegante mansão no Corredor da Vitória, Salvador, preservando a herança da aristocracia baiana dos séculos XVIII e XIX. Com um acervo de cerca de 3.175 peças — incluindo mobiliário, prataria, joias, porcelanas e objetos decorativos —, o museu retrata o cotidiano e o luxo das famílias tradicionais. Inaugurado em novembro de 1969, oferece ainda biblioteca, auditório, exposições temporárias, ações educativas e o charmoso Balangandan Café, sendo um espaço que une história, arte e cultura no coração da cidade.'  
  },
  {
    id: 'salvador',
    coords: [-12.99483, -38.52750],
    title: "Museu Carlos Costa Pinto - Salvador",
    images: ['images/museucarlos.jpg', 'images/museucarlos2.jpg','images/museucarlos3.jpg','images/museucarlos4.jpg', 'images/museucarlos5.jpg', 'images/museucarlos6.jpg'],
    desc: 'O Museu de Arte Sacra da UFBA, localizado em Salvador no antigo Convento de Santa Teresa, abriga uma das mais importantes coleções de arte sacra do Brasil. Seu acervo inclui esculturas, pinturas, mobiliário e objetos litúrgicos dos séculos XVII ao XIX, representando a rica herança cultural e religiosa do período colonial. Além das exposições, o espaço promove atividades educativas e culturais, sendo um ponto de encontro entre arte, história e espiritualidade no coração da capital baiana.'
  },
  {
    id: 'salvador',
    coords: [-12.9787, -38.5059],
    title: "Instituto Geográfico e Histórico da Bahia - Salvador",
    images: ['images/ighb1.jpg', 'images/ighb2.jpg', 'images/ighb3.jpg','images/ighb4.jpg','images/ighb5.jpg', 'images/ighb6.jpg'],
    desc: 'O Instituto Geográfico e Histórico da Bahia (IGHB), fundado em 13 de maio de 1894, é uma das instituições culturais mais antigas da Bahia. Instalado em um imponente edifício neoclássico na Avenida Sete de Setembro, esquina com a Praça da Piedade, abriga um vasto acervo cartográfico, biblioteca histórica, arquivos e um museu com objetos, documentos e periódicos que narram a formação do estado. O IGHB também promove eventos, palestras e exposições, sendo um ponto de referência para pesquisadores, historiadores e o público interessado na memória cultural e geográfica da Bahia.'
  },

  {
    id: 'salvador',
    coords: [-13.00446, -38.53390],
    title: "Forte Santa Maria-Espaço Pierre Verger - Salvador",
    images: ['images/santamaria1.jpg', 'images/santamaria2.jpg', 'images/santamaria3.jpg','images/santamaria4.jpg'],
    desc: 'O Forte de Santa Maria, localizado à beira da Praia do Porto da Barra, abriga o Espaço Pierre Verger da Fotografia Baiana, um centro cultural dedicado à valorização da fotografia local. Instalado em uma antiga fortificação do século XVII, o espaço exibe exposições permanentes e temporárias, utiliza recursos tecnológicos como projeções e realidade virtual, e promove eventos culturais com vista privilegiada da baía. A entrada dá acesso também ao Espaço Carybé no Forte de São Diogo, e todas as quartas-feiras é gratuita, reforçando seu papel como polo de memória, arte e inovação em Salvador.'
  },

  {
    id: 'salvador',
    coords: [-12.9225, -38.3971],
    title: "Casa da música da Bahia - Salvador",
    images: ['images/itapua.jpg', 'images/itapua1.jpg', 'images/itapua2.jpg', 'images/itapua3.jpg','images/itapua4.jpg'],
    desc: 'A Casa da Música da Bahia, localizada em Itapuã, Salvador, é um espaço cultural dedicado à valorização da música popular e instrumental baiana. Com uma programação diversificada que inclui shows, workshops e eventos educativos, o local promove a cultura local e oferece infraestrutura para artistas e público. Situada em uma região de forte tradição musical, a Casa da Música é um ponto de encontro para a comunidade e para quem deseja vivenciar a riqueza sonora da Bahia.'
  },

  {
    id: 'ilheus',
    coords: [-14.7978, -39.0328],
    title: "Espaço Cultural Casa de Arte Baiana - Ilhéus",
    images: ['images/espaço1.jpg', 'images/espaço2.jpg', 'images/espaço3.jpg', 'images/espaço4.jpg','images/espaço5.jpg'],
    desc: 'O Espaço Cultural Casa de Arte Baiana, localizado no centro histórico de Ilhéus, é um museu privado que reúne um rico acervo de arte baiana e internacional. Fundado pelo colecionador Michael Eckes, o espaço promove exposições, possui uma biblioteca e apresenta obras de artistas renomados, sendo um importante polo cultural da região.'
  },

    {
    id: 'canavieiras',
    coords: [-15.6833, -38.9464],
    title: "Porto Histórico de Canavieiras",
    images: ['images/galeria1.jpg', 'images/galeria2.jpg', 'images/galeria4.jpg'],
    desc: 'O Porto Histórico de Canavieiras, também conhecido como Porto Grande, é um antigo cais comercial às margens do Rio Pardo. No local, os navios que transportavam cacau e passageiros atracavam, cenário retratado em fotos e recordações da cidade. O casario colonial restaurado ao redor abriga a Galeria do Porto, um pequeno museu que exibe peças, documentos antigos e fotografias que contam a história da região desde o século XIX.'
    },

    {
    id: 'salvador',
    coords: [-12.99899, -38.52551],
    title: "Museu Rodin Bahia, Palacete das Artes - Salvador",
    images: ['images/palaceteartes1.jpg', 'images/palaceteartes2.jpg', 'images/palaceteartes3.jpg', 'images/palaceteartes4.jpg', 'images/palaceteartes5.jpg', 'images/palaceteartes6.jpg'],
    desc: 'O Museu Rodin Bahia está instalado no histórico Palacete Comendador Bernardo Martins Catharino, no bairro da Graça, em Salvador. Dedicado às obras do escultor francês Auguste Rodin, o acervo inclui peças em bronze como "O Homem que Anda sobre a Coluna" e outros clássicos, além de exposições temporárias. O museu representa um elo cultural entre a Bahia e a França, compondo um ambiente de arte, arquitetura e história no coração da cidade.'  
    },

    {
    id: 'Salvador',
    coords: [-13.00776, -38.48974],
    title: "Memorial Casa do Rio Vermelho - Salvador",
    images: ['images/riovermelho1.jpg', 'images/riovermelho2.jpg', 'images/riovermelho3.jpg', 'images/riovermelho4.jpg','images/riovermelho5.jpg'],
    desc: 'A Casa do Rio Vermelho, última residência de Jorge Amado e Zélia Gattai, foi transformada em memorial interativo. Com projeções de vídeos, áudios, objetos pessoais e mobiliário original, permite um mergulho na vida e obra do casal literário. O jardim abriga as cinzas dos escritores e é ponto de encontro cultural, conectando a história literária da Bahia ao público por meio de arte, arquitetura e memória.'  
    },

    {
    id: 'cachoeira_hansen',
    coords: [-12.5300, -38.9650],
    title: "Museu Hansen Bahia - Cachoeira",
    images: ['images/museuhansen.jpg', 'images/museuhansen1.jpg', 'images/museuhansen2.jpg', 'images/museuhansen3.jpg'],
    desc: 'O Museu Hansen Bahia, em Cachoeira, preserva gravuras em madeira do artista alemão Karl Heinz Hansen, que retratam cenas religiosas e cotidianas, fundindo técnicas europeias com a cultura local desde 1946. Um espaço íntimo e artístico no coração da cidade colonial.'
    },

    {
    id: 'museu_geologico_vitoria',
    coords: [-12.9791, -38.5127],
    title: "Museu Geológico da Bahia - Vitória",
    images: ['images/museugeo.jpg', 'images/museugeo1.jpg', 'images/museugeo2.jpg', 'images/museugeo3.jpg', 'images/museugeo4.jpg', 'images/museugeo5.jpg'],
    desc: 'O Museu Geológico da Bahia, localizado no Corredor da Vitória, reúne amostras de meteoritos, pedras preciosas e formação geológica do estado. Com exposições temáticas e educativas, é um polo de conhecimento científico e histórico-artístico.'
    },

    {
    id: 'Salvador',
    coords: [-12.9825, -38.4480],
    title: "Espaço Mário Cravo - Salvador",
    images: ['images/cravo.jpg', 'images/cravo1.jpg', 'images/cravo2.jpg', 'images/cravo3.jpg'],
    desc: 'O Espaço Mário Cravo, no Parque de Pituaçu, exibe esculturas ao ar livre do renomado artista plástico Mário Cravo Júnior. Em meio à natureza, o espaço oferece um diálogo entre arte moderna e ambiente, integrando ateliê, galeria e acervo público.'
    },

    {
    id: 'Porto Seguro',
    coords: [-16.4353, -39.0645],
    title: "Museu de Arte Sacra - Porto Seguro",
    images: ['images/museuporto1.jpg', 'images/museuporto2.jpg', 'images/museuporto3.jpg', 'images/museuporto4.jpg','images/museuporto5.jpg'],
    desc: 'O Museu de Arte Sacra de Porto Seguro apresenta obras religiosas e objetos litúrgicos do período colonial. Instalado em prédio histórico, ressalta a importância da fé e da arte sacra na formação cultural da região.'
    },

    {
    id: 'Porto Seguro',
    coords: [-16.4200, -39.0811],
    title: "Solar do Imperador - Trancoso",
    images: ['images/solar.jpg', 'images/solar1.jpg', 'images/solar2.jpg', 'images/solar3.jpg'],
    desc: 'O Solar do Imperador em Trancoso é um casario histórico do século XIX que hoje abriga exposições de arte contemporânea e regional. A arquitetura colonial misturada a instalações artísticas faz do lugar um polo cultural inovador.'
    },

    {
    id: 'Ilheus',
    coords: [-14.7935, -39.0470],
    title: "Museu Regional de Ilhéus - Casa de Jorge Amado",
    images: ['images/museuilheus.jpg', 'images/museuilheus2.jpg', 'images/museuilheus3.jpg'],
    desc: 'O Museu Regional de Ilhéus funciona na antiga casa de Jorge Amado, preservando mobiliário, fotografias e objetos que contam a história literária da cidade e do escritor. Um patrimônio imersivo para amantes da cultura baiana.'
    },


    {
    id: 'Ilheus',
    coords: [-14.7900, -39.0280],
    title: "Museu do Cacau - Ilhéus",
    images: ['images/cacau1.jpg', 'images/cacau2.jpg', 'images/cacau3.jpg'],
    desc: 'O Museu do Cacau, em Itabuna, retrata a história do ciclo do cacau na região, exibindo equipamentos, fotografias e artefatos ligadas à cultura agrícola e mercantil do sul da Bahia.'
    },

    {
    id: 'santo amaro',
    coords: [-13.2600, -39.5100],
    title: "Igreja Nossa Senhora do Rosário - Santo Amaro",
    images: ['images/igreja1.jpg', 'images/igreja2.jpg', 'images/igreja3.jpg'],
    desc: 'Construída no século XVIII por membros da Irmandade do Rosário, a Igreja de Santo Amaro abriga imagens sacras, azulejos e pinturas de relevância histórica, sendo marco da religiosidade afro-brasileira e patrimônio arquitetônico.'
    },

    {
    id: 'juazeiro',
    coords: [-9.4161, -40.5039],
    title: "Museu Casa de Eurico Gaspar Dutra — Juazeiro",
    images: ['images/museujua1.jpg', 'images/museujua2.jpg', 'images/museujua3.jpg', 'images/museujua4.jpg'],
    desc: 'Localizado em Juazeiro, na Bahia, o Museu Casa de Eurico Gaspar Dutra é dedicado à memória do presidente Eurico Gaspar Dutra, que governou o Brasil entre 1946 e 1951. A casa-museu preserva objetos pessoais, documentos históricos e mobiliário da época, oferecendo uma viagem pela história política e cultural da região. Além de seu valor histórico, o museu é um importante espaço para a promoção da cultura local e educacional.'
}

];



      // Parte do Modal para que o usuário consiga clicar e abrir a foto


locations.forEach(loc => {
  const marker = L.marker(loc.coords).addTo(map)
    .bindPopup(createPopup(loc.id, loc.title, loc.images, loc.desc))
    .on('popupopen', () => {
      // habilita o slider, se tiver essa função
      if (typeof enableSlider === 'function') {
        enableSlider(loc.id, loc.images.length);
      }

      const slider = document.getElementById(`slider-${loc.id}`);
      if (!slider) return;

      slider.querySelectorAll('img').forEach(img => {
        img.onclick = () => {
          const modal = document.getElementById('modal');
          modal.querySelector('img').src = img.src;
          modal.style.display = 'flex';
        };
      });
    });

  loc.marker = marker;
});

const modal = document.getElementById('modal');
modal.onclick = e => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modal.querySelector('img').src = '';
  }
};






// Coordenadas aproximadas das cidades para mostrar o mapa inteiro
const cidades = [
  {
    nome: 'salvador',
    bounds: [
      [-13.0600, -38.6000],
      [-12.8500, -38.3500]
    ]
  },
  {
    nome: 'ilheus',
    bounds: [
      [-14.8500, -39.1300],
      [-14.7000, -39.0000]
    ]
  },
  {
    nome: 'juazeiro',
    bounds: [
        [-9.4200, -40.5300],
        [-9.3300, -40.4500]
    ]
  },
  {
    nome: 'cachoeira',
    bounds: [
        [-12.7100, -38.9400],
        [-12.6500, -38.8600]
    ]
  },
  {
    nome: 'feira de santana',
    bounds: [
        [-12.3000, -38.3000],
        [-12.2100, -38.2100]
    ]
  },
  {
    nome: 'alagoinhas',
    bounds: [
        [-12.1300, -38.4200],
        [-12.0700, -38.3500]
    ]
  },
  {
    nome: 'itabuna',
    bounds: [
      [-14.8200, -39.3200],
      [-14.7500, -39.2400]
    ]
  },
  {
    nome: 'porto seguro',
    bounds: [
      [-16.5400, -39.1600],
      [-16.3700, -38.9700]
    ]
  },
  {
    nome: 'canavieiras',
    bounds: [
      [-15.7300, -39.0000],
      [-15.6200, -38.9000]
    ]
  }
];

// Função que leva o mapa até a cidade pesquisada
function buscarCidade() {
  console.log('Função buscarCidade chamada');
  const termo = document.getElementById('buscaCidade').value.trim().toLowerCase();
  const cidade = cidades.find(c => c.nome === termo);

  if (cidade) {
    map.fitBounds(cidade.bounds);
    document.getElementById('busca-container').style.display = 'none';
  } else {
    alert('Cidade não encontrada. Verifique o nome digitado.');
  }
}
