import React from "react";
import "./KpiCard.css";

/**
 * KpiCard Component Standardized for Economic Indicators
 *
 * @param {Object} props
 * @param {string} props.title         - Nombre del indicador (ej: "Inflación mensual")
 * @param {string} props.value         - Valor formateado (ej: "2,3%")
 * @param {string} [props.change]      - Texto de variación (ej: "-0,4 p.p.")
 * @param {string} [props.changeType]  - "positive" | "negative" | "warning" | "neutral"
 * @param {string} [props.source]      - Fuente oficial (ej: "INDEC", "BCRA")
 * @param {string} [props.date]        - Período/Fecha (ej: "Agosto 2026")
 * @param {string} [props.subtitle]    - Métrica secundaria (ej: "Interanual: 31,8%")
 * @param {boolean} [props.isGood]     - Si la variación representa una mejora económica
 */
export function KpiCard({
  title,
  value,
  change,
  changeType,
  source = "OFICIAL",
  date,
  subtitle,
  isGood,
}) {
  // Determine semantic color style
  let badgeClass = "badge-neutral";
  let arrowSymbol = "";

  if (isGood === true) {
    badgeClass = "badge-positive";
    arrowSymbol = "▲ ";
  } else if (isGood === false) {
    badgeClass = "badge-negative";
    arrowSymbol = "▼ ";
  } else if (changeType === "positive") {
    badgeClass = "badge-positive";
    arrowSymbol = "▲ ";
  } else if (changeType === "negative") {
    badgeClass = "badge-negative";
    arrowSymbol = "▼ ";
  }

  return (
    <article className="kpi-card">
      <div className="kpi-card-header">
        <span className="kpi-card-title">{title}</span>
        <span className="kpi-card-source">{source}</span>
      </div>

      <div className="kpi-card-body">
        <span className="kpi-card-value tabular-nums">{value}</span>

        {change && (
          <span className={`kpi-card-badge ${badgeClass}`}>
            {arrowSymbol}{change}
          </span>
        )}
      </div>

      <div className="kpi-card-footer">
        {subtitle && <span className="kpi-card-subtitle">{subtitle}</span>}
        {date && <span className="kpi-card-date">{date}</span>}
      </div>
    </article>
  );
}

export default KpiCard;
