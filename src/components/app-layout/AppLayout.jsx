import { useState } from "react";
import Column from "../column/column";
import classes from "./AppLayout.module.css";
import Delete from "../Delete/Delete";

export default function AppLayout() {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  return (
    <main className={classes.container}>
      <Column
        title="backlog"
        cards={cards}
        setCards={setCards}
        color={"rgb(115 115 115)"}
      />
      <Column
        title="ToDo"
        cards={cards}
        setCards={setCards}
        color={"rgb(254 240 138)"}
      />
      <Column
        title="in-progress"
        cards={cards}
        setCards={setCards}
        color={"rgb(191 219 254)"}
      />
      <Column
        title="completed"
        cards={cards}
        setCards={setCards}
        color={"rgb(167 243 208)"}
      />
      <Delete setCards={setCards} />
    </main>
  );
}
const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "ToDo",
  },
  { title: "Postmortem for outage", id: "6", column: "ToDo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "ToDo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "in-progress",
  },
  { title: "Add logging to daily CRON", id: "9", column: "in-progress" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "completed",
  },
];
