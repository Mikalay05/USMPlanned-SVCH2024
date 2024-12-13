import CustomerCard from "../CustomerCard/CustomerCard";
import TaskStatus from "../TaskStatus/TaskStatus";
import "./TaskCard.css"; // Не забудьте добавить .css файл

export default function TaskCard({
    taskData,
    cardIsActiveElement,
    RGBAColorForTaskCards = { r: 153, g: 0, b: 255 }
}) {
    console.log(taskData);

    // Функция для преобразования формата dd.mm.yyyy в объект Date
    const parseDate = (dateString) => {
        const parts = dateString.split('.');
        if (parts.length !== 3) return null; // Проверка на корректный формат
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Месяцы в JavaScript начинаются с 0
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    };

    // Функция для вычисления количества дней до срока
    const calculateDaysUntilDeadline = (deadline) => {
        if (!deadline) return null;

        const deadlineDate = parseDate(deadline); // Параметр deadline преобразуется
        if (!deadlineDate || isNaN(deadlineDate.getTime())) return null; // Проверка на валидность даты

        const today = new Date();
        const differenceInTime = deadlineDate - today;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays;
    };

    const daysUntilDeadline = calculateDaysUntilDeadline(taskData.deadline);

    return (
        <CustomerCard
            textValue={taskData.name}
            isActiveElement={cardIsActiveElement}
            backgroundColor={RGBAColorForTaskCards}
        >
            <h4>{taskData.name}</h4>
            {taskData.image && <img src={taskData.image} alt={`${taskData.name} image`} />}

            {taskData.deadline ? (
                <>
                    {daysUntilDeadline === 0 ? (
                        <p>Сроки: сегодня</p>
                    ) : daysUntilDeadline > 0 ? (
                        <p>Ещё {daysUntilDeadline} {daysUntilDeadline === 1 ? "день" : "дня"} до сдачи</p>
                    ) : (
                        <p>Срок истек</p> 
                    )}
                </>
            ) : null}

            <TaskStatus taskStatusId={taskData.taskStatusId} taskStatusName={taskData.taskStatusName} />
        </CustomerCard>
    );
}