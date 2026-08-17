import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import IpconlineProducts from '../components/IpconlineProducts';
import '../styles/home.css';

export default function IpconlinePage() {
  return (
    <main className="ipconline-page">
      <ErrorBoundary>
        <h1>IPConline</h1>
        <p>Datos tomados de la fuente IPConline / Coto (prueba)</p>
        <IpconlineProducts limit={48} />
      </ErrorBoundary>
    </main>
  );
}
