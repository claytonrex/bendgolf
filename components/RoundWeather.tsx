"use client";
import { useEffect, useState } from "react";
import { Round } from "@/lib/data";

type DailyForecast = {
  high: number;
  low: number;
  precipPct: number | null;
  code: number;
  wind: number;
};

// Open-Meteo WMO weather code → emoji + short label
function codeLabel(code: number): { emoji: string; label: string } {
  if (code === 0) return { emoji: "☀️", label: "Clear" };
  if (code <= 2) return { emoji: "🌤️", label: "Mostly clear" };
  if (code === 3) return { emoji: "☁️", label: "Overcast" };
  if (code >= 45 && code <= 48) return { emoji: "🌫️", label: "Fog" };
  if (code >= 51 && code <= 57) return { emoji: "🌦️", label: "Drizzle" };
  if (code >= 61 && code <= 67) return { emoji: "🌧️", label: "Rain" };
  if (code >= 71 && code <= 77) return { emoji: "🌨️", label: "Snow" };
  if (code >= 80 && code <= 82) return { emoji: "🌧️", label: "Showers" };
  if (code >= 95) return { emoji: "⛈️", label: "Thunder" };
  return { emoji: "🌤️", label: "Mild" };
}

export function RoundWeather({ round }: { round: Round }) {
  const [data, setData] = useState<DailyForecast | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "far" | "error">("loading");

  useEffect(() => {
    const tripDate = new Date(round.date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysAway = Math.round((tripDate.getTime() - today.getTime()) / 86400000);

    // Open-Meteo forecast is ~16 days. Outside that, show a "too far out" state.
    if (daysAway > 16) {
      setStatus("far");
      return;
    }
    if (daysAway < 0) {
      setStatus("far");
      return;
    }

    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(round.lat));
    url.searchParams.set("longitude", String(round.lng));
    url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max");
    url.searchParams.set("temperature_unit", "fahrenheit");
    url.searchParams.set("wind_speed_unit", "mph");
    url.searchParams.set("timezone", "America/Los_Angeles");
    url.searchParams.set("start_date", round.date);
    url.searchParams.set("end_date", round.date);

    fetch(url.toString())
      .then((r) => r.json())
      .then((json) => {
        if (!json?.daily?.weather_code?.[0] && json?.daily?.weather_code?.[0] !== 0) {
          setStatus("error");
          return;
        }
        setData({
          high: Math.round(json.daily.temperature_2m_max[0]),
          low: Math.round(json.daily.temperature_2m_min[0]),
          precipPct: json.daily.precipitation_probability_max?.[0] ?? null,
          code: json.daily.weather_code[0],
          wind: Math.round(json.daily.wind_speed_10m_max[0]),
        });
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, [round.date, round.lat, round.lng]);

  if (status === "loading") {
    return <div className="text-xs text-stone-400">Loading weather…</div>;
  }
  if (status === "far") {
    return <div className="text-xs text-stone-400">Forecast available within 16 days of round.</div>;
  }
  if (status === "error" || !data) {
    return <div className="text-xs text-stone-400">Weather unavailable.</div>;
  }

  const { emoji, label } = codeLabel(data.code);
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-2xl leading-none">{emoji}</span>
      <div>
        <div className="font-semibold">
          {data.high}° / {data.low}° · {label}
        </div>
        <div className="text-xs text-stone-500">
          {data.precipPct != null && <>💧 {data.precipPct}% · </>}
          💨 {data.wind} mph
        </div>
      </div>
    </div>
  );
}
