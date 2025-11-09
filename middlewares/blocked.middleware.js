export function blockByDaysAndHours(blockedDays = []) {
    return (req, res, next) => {
        const now = new Date();
        req.currentDate = now; 

        const day = now.getDay();
        const hour = now.getHours();

        const blocked = blockedDays.some(b => 
            b.day === day && hour >= b.startHour && hour < b.endHour
        );

        if (blocked) {
            return res.status(403).json({ message: "Service not available at this time" });
        }

        next();
    };
}