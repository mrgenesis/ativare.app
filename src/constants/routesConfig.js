const routesConfig = {
  homepage: '/',
  login: '/login',
  material: {
    home: {
      displayName: 'Material',
      api: '/material',
      front: '/material'
    },
    new: {
      displayName: 'Adicionar Novo',
      api: '/material/new',
      front: '/material/novo'
    }
  },
  product: {
    home: {
      displayName: 'Produto',
      api: '/product',
      front: '/produto'
    },
    new: {
      displayName: 'Adicionar Novo',
      api: '/product/new',
      front: '/produto/novo'
    }
  },
  budget: {
    home: {
      displayName: 'Orçamento',
      api: '/budget',
      front: '/orcamento'
    },
    new: {
      displayName: 'Adicionar Novo',
      api: '/budget/new',
      front: '/orcamento/novo'
    }
  },
  user: {
    home: {
      displayName: 'Usuário',
      api: '/auth',
      front: '/usuario'
    },
    new: {
      displayName: 'Adicionar Novo',
      api: '/auth/register',
      front: '/usuario/novo'
    }
  }
};




export { routesConfig };