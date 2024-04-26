import "./Sidebar.css";
import { Icon } from '@iconify/react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div>
                <h1 id="heading">Hora</h1>
            </div> 
            <div>
                <ul>
                    <li id="dashboard">
                        <a href="/DashboardPage"><Icon icon="majesticons:home-line" width="1.2em" height="1.2em" /></a>
                    </li>
                    <li id="calendar">
                        <a href="/CalendarPage"><Icon icon="majesticons:calendar-line" width="1.2em" height="1.2em" /></a>
                    </li>
                    <li id="profile">
                        <a href="/ProfilePage"><Icon icon="majesticons:user-line" width="1.2em" height="1.2em" /></a>
                    </li>
                    <li id="settings">
                        <a href="/SettingsPage"><Icon icon="majesticons:settings-cog-line" width="1.2em" height="1.2em" /></a>
                    </li>
                </ul>
            </div>
            <div>
            <a className="logout-icon" href="/"><Icon icon="majesticons:logout-line" width="1.2em" height="1.2em" /></a>
            </div>
        </div>
    );
};

export default Sidebar;
