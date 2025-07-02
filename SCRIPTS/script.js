window.onload = function () {
  var tcad = document.getElementById("tcad");
  var criart = document.getElementById("criart");
  var tit = document.getElementById("tit");
  var ass = document.getElementById("ass");
  var cad = document.getElementById("cad");

  var titulos = [];

  function limparFormulario() {
    criart.querySelector('input[type="text"]').value = "";
    criart.querySelector('select').selectedIndex = 0;
    criart.querySelector('input[type="checkbox"]').checked = false;
  }

  function mostrar(id) {
    document.getElementById(id).style.display = "";
  }
  function esconder(id) {
    document.getElementById(id).style.display = "none";
  }

  function atualizarProgresso() {
    var assistidosCount = titulos.filter(t => t.assistido).length;
    var progressoTexto = `${assistidosCount} de ${titulos.length} títulos assistidos`;
    return progressoTexto;
  }

  function Cadastrados() {
    tcad.innerHTML = "";

    if (titulos.length === 0) {
      tcad.innerHTML = "<p style='color: white; text-align:center;'>Nenhum título cadastrado.</p>";
      return;
    }

    var progresso = document.createElement("p");
    progresso.style.color = "white";
    progresso.style.textAlign = "center";
    progresso.style.marginBottom = "15px";
    progresso.textContent = atualizarProgresso();
    tcad.appendChild(progresso);

    titulos.forEach((titulo, index) => {
      var div = document.createElement("div");
      div.className = "titulo";
      div.style.position = "relative";
      div.innerHTML = `
        <button class="excluir-btn" title="Excluir título" style="position:absolute; top:5px; right:5px; background: transparent; border:none; font-size: 20px; color: red; cursor: pointer;">&times;</button>
        <div class="nome">${titulo.nome}</div>
        <div class="tipo">Tipo: ${titulo.tipo}</div>
        <label class="assistido" style="cursor:pointer; display:flex; align-items:center; gap:6px; margin-top:5px;">
          <input type="checkbox" ${titulo.assistido ? "checked" : ""} style="transform: scale(1.2); cursor:pointer;">
          Assistido
        </label>
      `;

      var btnExcluir = div.querySelector(".excluir-btn");
      btnExcluir.addEventListener("click", () => {
        if (confirm(`Quer mesmo excluir o título "${titulo.nome}"?`)) {
          titulos.splice(index, 1);
          Cadastrados();
        }
      });

      var checkbox = div.querySelector('input[type="checkbox"]');
      checkbox.addEventListener("change", () => {
        titulos[index].assistido = checkbox.checked;
        Cadastrados();
      });

      tcad.appendChild(div);
    });
  }

  function Assistidos() {
    tcad.innerHTML = "";

    var assistidos = titulos.filter(t => t.assistido);

    if (assistidos.length === 0) {
      tcad.innerHTML = "<p style='color: white; text-align:center;'>Nenhum título assistido.</p>";
      return;
    }

    var progresso = document.createElement("p");
    progresso.style.color = "white";
    progresso.style.textAlign = "center";
    progresso.style.marginBottom = "15px";
    progresso.textContent = atualizarProgresso();
    tcad.appendChild(progresso);

    assistidos.forEach((titulo) => {
      var div = document.createElement("div");
      div.className = "titulo";
      div.style.position = "relative";
      div.innerHTML = `
        <div class="nome">${titulo.nome}</div>
        <div class="tipo">Tipo: ${titulo.tipo}</div>
        <div class="assistido">Assistido: Sim</div>
        <button class="desmarcar-btn" style="position:absolute; top:5px; right:5px; background: transparent; border: 1px solid white; color: white; padding: 3px 8px; border-radius: 4px; cursor: pointer;">Desmarcar</button>
      `;

      var realIndex = titulos.findIndex(t => t === titulo);

      var btnDesmarcar = div.querySelector(".desmarcar-btn");
      btnDesmarcar.addEventListener("click", () => {
        if (confirm(`Quer desmarcar "${titulo.nome}" como assistido?`)) {
          titulos[realIndex].assistido = false;
          Assistidos();
        }
      });

      tcad.appendChild(div);
    });
  }

  mostrar("criart");
  esconder("tcad");

  cad.addEventListener("click", function () {
    mostrar("criart");
    esconder("tcad");
  });

  tit.addEventListener("click", function () {
    mostrar("tcad");
    esconder("criart");
    Cadastrados();
  });

  ass.addEventListener("click", function () {
    mostrar("tcad");
    esconder("criart");
    Assistidos();
  });

  var botaoCadastrar = criart.querySelector("button");
  botaoCadastrar.addEventListener("click", function (e) {
    e.preventDefault();
    var nome = criart.querySelector('input[type="text"]').value.trim();
    var tipoSelect = criart.querySelector("select");
    var tipo = tipoSelect.options[tipoSelect.selectedIndex].text;
    var assistido = criart.querySelector('input[type="checkbox"]').checked;

    if (!nome || tipoSelect.selectedIndex === 0) {
      alert("Por favor, preencha nome e selecione o tipo.");
      return;
    }

    titulos.push({ nome, tipo, assistido });
    limparFormulario();
    Cadastrados();
    mostrar("tcad");
    esconder("criart");
  });
};