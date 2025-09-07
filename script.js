// 🎨 Ícone genérico
const defaultImage = "https://via.placeholder.com/28x28?text=?";

// 📦 Base de receitas
const recipes = {
  strange_shield: {
    name: "Strange Shield",
    image: defaultImage,
    category: "Weapons",
    requires: {
      "diamond_plank": 18,
      "ruby": 450,
      "diamond": 200,
      "nail": 12,
      "scrap_metal": 8,
      "energy_core": 1,
      "sewing_kit": 5
    }
  },

  // Itens compostos
  diamond_plank: {
    name: "Diamond Plank",
    image: defaultImage,
    category: "Planks",
    requires: {
      "fossil_plank": 1,
      "diamond": 10,
      "crystal_log": 10,
      "nail": 4,
      "spring": 1
    }
  },
  fossil_plank: {
    name: "Fossil Plank",
    image: defaultImage,
    category: "Planks",
    requires: {
      "reinforced_plank": 1,
      "nail": 4,
      "spiked_log": 5,
      "spring": 1
    }
  },
  reinforced_plank: {
    name: "Reinforced Plank",
    image: defaultImage,
    category: "Planks",
    requires: {
      "normal_plank": 1,
      "nail": 2,
      "evergreen_log": 5
    }
  },
  normal_plank: {
    name: "Normal Plank",
    image: defaultImage,
    category: "Planks",
    requires: {
      "rusty_plank": 1,
      "nail": 2,
      "acacia_log": 5
    }
  },
  rusty_plank: {
    name: "Rusty Plank",
    image: defaultImage,
    category: "Planks",
    requires: {
      "aspen_log": 3
    }
  },

  // 🔑 Itens importantes reutilizáveis
  spring: {
    name: "Spring",
    image: defaultImage,
    category: "Minerals",
    requires: {
      "iron": 25,
      "lead": 25
    }
  },
  nail: {
    name: "Nail",
    image: defaultImage,
    category: "Minerals",
    requires: {
      "iron": 10,
      "lead": 10
    }
  },
  scrap_metal: {
    name: "Scrap Metal",
    image: defaultImage,
    category: "Minerals",
    requires: {
      "iron": 15,
      "lead": 15,
      "coal": 2
    }
  }
};

// Categorias manuais
const categories = {
  Minerals: ["lead", "iron", "ruby", "diamond", "coal"],
  Logs: ["aspen_log", "acacia_log", "evergreen_log", "crystal_log", "spiked_log"],
  "Pyramid Loot": ["energy_core", "lava_rune", "epic_recipe", "spider_web", "snake_skin"],
  Others: []
};

// 🛠️ Função recursiva para calcular materiais
function expandRecipe(item, quantidade, finalList = {}) {
  const recipe = recipes[item];
  if (!recipe) {
    // Item base
    finalList[item] = (finalList[item] || 0) + quantidade;
    return finalList;
  }
  for (const [material, qty] of Object.entries(recipe.requires)) {
    expandRecipe(material, qty * quantidade, finalList);
  }
  return finalList;
}

// 🔎 Determinar categoria
function getCategory(item) {
  for (const [cat, items] of Object.entries(categories)) {
    if (items.includes(item)) return cat;
  }
  if (recipes[item]?.category) return recipes[item].category;
  return "Others";
}

// 🖥️ Mostrar resultado
function calcular() {
  const item = document.getElementById("item").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const resultado = document.getElementById("resultado");

  const materiais = expandRecipe(item, quantidade);

  let html = `<h2>Materiais necessários para ${quantidade}x ${recipes[item].name}</h2>`;

  const porCategoria = {};
  for (const [mat, qty] of Object.entries(materiais)) {
    const categoria = getCategory(mat);
    if (!porCategoria[categoria]) porCategoria[categoria] = [];
    porCategoria[categoria].push({ mat, qty });
  }

  for (const [cat, items] of Object.entries(porCategoria)) {
    html += `<div class="category"><h3>${cat}</h3><ul>`;
    for (const { mat, qty } of items) {
      const nome = recipes[mat]?.name || mat.replace(/_/g, " ");
      const img = recipes[mat]?.image || defaultImage;
      html += `
        <li class="item">
          <img src="${img}" alt="${nome}">
          <span><strong>${qty}</strong> × ${nome}</span>
        </li>
      `;
    }
    html += "</ul></div>";
  }

  resultado.innerHTML = html;
}
