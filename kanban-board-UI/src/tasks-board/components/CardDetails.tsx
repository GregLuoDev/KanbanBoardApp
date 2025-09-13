import { CardContent, Typography } from '@mui/material';
import { convertUTCToLocal, TCard } from '../shared/utils';

export function CardDetails({ card }: { card: TCard }) {
  return (
    <CardContent>
      <Typography gutterBottom variant="h6" component="h5">
        {card.title}
      </Typography>
      <Typography variant="body1" component="p">
        {card.description}
      </Typography>
      <Typography variant="caption" component="p">
        Created at: {convertUTCToLocal(card.createdAt)}
      </Typography>
      <Typography variant="caption" component="p">
        Updated at: {convertUTCToLocal(card.updatedAt)}
      </Typography>
    </CardContent>
  );
}
