export const mainKey = 'rule'
  , mainLabel = 'Defina uma regra de cálculo'
  , rulesList = [
    {
      key: 'amountsAreEquals',
      label: 'Regra 1/1',
      help: 'Ocupará 100% da capacidade do equipamento. '
    },
    {
      key: 'oneIndividualItemForTwoSelected',
      label: 'Regra 1/2',
      help: 'Ocupará 50% da capacidade do equipamento. '
    },
    {
      key: 'oneIndividualItemForFuorSelected',
      label: 'Regra 1/4',
      help: 'Ocupará 25% da capacidade do equipamento. '
    },
    {
      key: 'oneIndividualItemForEightSelected',
      label: 'Regra 1/8',
      help: 'Ocupará 12,5% da capacidade do equipamento. '
    }
  ]
  , displayNames = (function () {
    let obj = {};
    rulesList.map(r => obj[r.key] = r.label)
    return obj
  })()
  , rules = {
    key: mainKey,
    label: mainLabel,
    values: rulesList,
    value(findKey) {
      let v = this.values.find(v => v.key === findKey);
      return v;
    }
  };