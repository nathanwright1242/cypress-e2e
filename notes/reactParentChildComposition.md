```javascript
import React from 'react';
import styles from './EmployeeContactList.module.css';

interface Employee {
  sid: string;
  name: string;
}

interface EmployeeContactListProps {
  contacts: Employee[];
  label?: string;
}

const EmployeeContactList: React.FC<EmployeeContactListProps> = ({ 
  contacts = [], 
  label 
}) => {
  // Early return for empty contacts
  if (!contacts.length) {
    return null;
  }

  const baseUrl = process.env.REACT_APP_PHONEBOOK_HOST || '';

  return (
    <div className={styles.employeeContactContainer}>
      {label && <strong>{label}:</strong>}
      
      <div className={styles.contactsList}>
        {contacts.map((employee, index) => (
          <ContactLink
            key={employee.sid}
            employee={employee}
            baseUrl={baseUrl}
            isLast={index === contacts.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

interface ContactLinkProps {
  employee: Employee;
  baseUrl: string;
  isLast: boolean;
}

const ContactLink: React.FC<ContactLinkProps> = ({ 
  employee, 
  baseUrl, 
  isLast 
}) => (
  <>
    <a
      href={`${baseUrl}/worker/${employee.sid}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.contactLink}
    >
      {employee.name}
    </a>
    {!isLast && <span className={styles.separator}>, </span>}
  </>
);

export default EmployeeContactList;
```
