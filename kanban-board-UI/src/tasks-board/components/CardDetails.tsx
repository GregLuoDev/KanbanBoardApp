import { CardContent, Typography } from '@mui/material';
import { convertUTCToLocal, TCard } from '../shared/utils';

export function CardDetails({ card }: { card: TCard }) {
  return (
    <CardContent className="p-4 pb-0!">
      <Typography gutterBottom variant="h6" component="h5" className="bg-gray-100">
        {card.title}
      </Typography>

      <Typography variant="body1" component="p">
        {card.description}
      </Typography>

      <div className="mt-2">
        <Typography variant="caption" component="p">
          Created at: {convertUTCToLocal(card.createdAt)}
        </Typography>
        <Typography variant="caption" component="p">
          Updated at: {convertUTCToLocal(card.updatedAt)}
        </Typography>
      </div>
    </CardContent>
  );
}
