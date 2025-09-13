'use client';

import { type Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { Card, CardActionArea, CardActions } from '@mui/material';
import { RefObject } from 'react';
import { DeleteTaskButton } from '../../buttons/DeleteTaskButton';
import { EditTaskButton } from '../../buttons/EditTaskButton';
import { TCard } from '../../shared/utils';
import { CardDetails } from './CardDetails';
export type TCardState =
  | {
      type: 'idle';
    }
  | {
      type: 'is-dragging';
    }
  | {
      type: 'is-dragging-and-left-self';
    }
  | {
      type: 'is-over';
      dragging: DOMRect;
      closestEdge: Edge;
    }
  | {
      type: 'preview';
      container: HTMLElement;
      dragging: DOMRect;
    };

const innerStyles: { [Key in TCardState['type']]?: string } = {
  idle: 'hover:outline outline-2 outline-neutral-50 cursor-grab',
  'is-dragging': 'opacity-40',
};

const outerStyles: { [Key in TCardState['type']]?: string } = {
  // We no longer render the draggable item after we have left it
  // as it's space will be taken up by a shadow on adjacent items.
  // Using `display:none` rather than returning `null` so we can always
  // return refs from this component.
  // Keeping the refs allows us to continue to receive events during the drag.
  'is-dragging-and-left-self': 'hidden',
};

export function CardShadow({ dragging }: { dragging: DOMRect }) {
  return <div className="flex-shrink-0 rounded bg-slate-900" style={{ height: dragging.height }} />;
}

export function CardDisplay({
  card,
  state,
  outerRef,
  innerRef,
}: {
  card: TCard;
  state: TCardState;
  outerRef?: RefObject<HTMLDivElement | null>;
  innerRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={outerRef}
      className={`flex flex-shrink-0 flex-col gap-2 px-3 pb-3 ${outerStyles[state.type]}`}
    >
      {/* Put a shadow before the item if closer to the top edge */}
      {state.type === 'is-over' && state.closestEdge === 'top' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
      <div
        className={`rounded bg-slate-700 text-slate-300 ${innerStyles[state.type]}`}
        ref={innerRef}
        style={
          state.type === 'preview'
            ? {
                width: state.dragging.width,
                height: state.dragging.height,
                transform: 'rotate(4deg)',
              }
            : undefined
        }
      >
        <Card>
          <CardActionArea>
            <CardDetails card={card} />
          </CardActionArea>
          <CardActions className="flex justify-between">
            <EditTaskButton card={card} />
            <DeleteTaskButton cardId={card.id} />
          </CardActions>
        </Card>
      </div>
      {/* Put a shadow after the item if closer to the bottom edge */}
      {state.type === 'is-over' && state.closestEdge === 'bottom' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
    </div>
  );
}
