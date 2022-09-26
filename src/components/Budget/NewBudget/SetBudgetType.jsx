
import { Button, ButtonGroup, Typography } from "@material-ui/core";

export default function SetBudgetType({ submit }) {
  return (
    <div>
      <Typography color="textSecondary" sx={{ margin: 2 }} variant='h6'>Selecione o tipo do orçamento</Typography>
      <ButtonGroup>
        <Button variant='outlined' fullWidth onClick={() => submit({ type: 'automation' })}><strong>Automação</strong></Button>
        <Button variant='outlined' fullWidth onClick={() => submit({ type: 'eletric' })}><strong>Elétrica</strong></Button>
      </ButtonGroup>
    </div>
  );
}
