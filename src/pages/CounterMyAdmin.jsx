import React, { useEffect, useState } from 'react';

function CounterMyAdmin() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Tutaj logika pobierania raportów z backendu
    // Na potrzeby przykładu załóżmy, że mamy statyczną listę raportów
    setReports([
      { id: 1, username: 'pracownik1', task: 'Przygotowanie dokumentacji.', hours: 8 },
      { id: 2, username: 'pracownik2', task: 'Optymalizacja bazy danych.', hours: 6 },
      // i tak dalej...
    ]);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Panel Administratora</h1>
      <h2 className="text-xl mb-2">Raporty pracowników:</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Pracownik</th>
              <th className="py-3 px-6 text-left">Zadanie</th>
              <th className="py-3 px-6 text-center">Godziny</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {reports.map((report) => (
              <tr className="border-b border-gray-200 hover:bg-gray-100" key={report.id}>
                <td className="py-3 px-6 text-left">{report.username}</td>
                <td className="py-3 px-6 text-left">{report.task}</td>
                <td className="py-3 px-6 text-center">{report.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CounterMyAdmin;
