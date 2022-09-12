const floorModel = {
  groundFloor: 'Térreo',
  secondFloor: '2º Pavimento',
  thirdFloor: '3º Pavimento'
};
const budgetModel = {
  ownId: 'getInServerByAuthorization',
  customer: {
      phone: 'phone',
      name: 'name',
      email: 'email'
  },
  productsList: {
      productName: 'product',
      id: 'id',
      floorKey: 'floor',
      floor: {
          groundFloor: { id: 'groundFloor', displayName: 'Térreo' },
          secondFloor: { id: 'secondFloor', displayName: '2º Pavimento' },
          thirdFloor: { id: 'thirdFloor', displayName: '3º Pavimento' }
      },
      floors: {
        keyName: 'floor',
        keys: Object.keys(floorModel),
        values: Object.values(floorModel)
      },
      homeLocationName: 'homeLocationName',
      amount: 'amount',
      category: { 
          automacao: 'automacao', 
          eletrica: 'eletrica' 
      },
      group: {
          iluminacao: 'iluminacao',
          sensores: 'sensores'
      },
      materials: {
          id: 'id',
          rule: 'rule'
      },
      controller: {
          basic: 'basic',
          admin: 'admin'
      }
  }
};
const materialModel = {
  name: {
      key: 'name',
      label: 'Nome do Item'
  },
  unitPrice: {
      key: 'unitPrice',
      label: 'Preço unitário (R$)'
  },
  rule: {
      key: 'rule',
      label: 'Defina uma regra de cálculo',
      values: [
          {
              key: 'oneIndividualItemForFuorSelected',
              label: 'Um Item para cada 4 selecionados',
              help: 'Quando o usuário adicionar 4 produtos, será calculado apenas 1 deste.'
          },
          {
              key: 'amountsAreEquals',
              label: 'Um Item para epenas um selecionado',
              help: 'Quando o usuário adicionar 4 produtos, será calculado 4 deste.'
          }
      ]
  }
};
const productModel = {
  name: {
      key: 'name',
      label: 'Nome do produto'
  },
  category: {
      key: 'category',
      label: 'Selecione uma categoria',
      values: ['Automação', 'Elétrica']
  },
  group: {
      key: 'group',
      label: 'Selecione um grupo',
      values: ['Iluminação', 'Sensor', 'Acessórios']
  },
  description: {
      key: 'description',
      label: 'Descrição'
  },
  materials: {
      key: 'materials',
      label: 'Selecione material para compor',
  }
}
export { floorModel, budgetModel, materialModel, productModel };
