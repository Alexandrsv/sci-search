"use client";

import { useEffect, useRef } from "react";

export function CipherBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mouseRef = useRef({ x: -1000, y: -1000 }); // Изначально курсор за пределами

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;
		const chars = "0123456789АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
		const fontSize = 14;
		const columnWidth = fontSize * 0.8; // Немного уже для плотности
		const rowHeight = fontSize * 2.2;

		// Состояние сетки символов
		let grid: string[][] = [];
		let cols = 0;
		let rows = 0;
		let lastUpdate = 0;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			cols = Math.ceil(canvas.width / columnWidth);
			rows = Math.ceil(canvas.height / rowHeight);

			// Инициализация сетки
			grid = [];
			for (let i = 0; i < rows; i++) {
				const row: string[] = [];
				for (let j = 0; j < cols; j++) {
					row.push(chars[Math.floor(Math.random() * chars.length)] || " ");
				}
				grid.push(row);
			}
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
		};
		window.addEventListener("mousemove", handleMouseMove);

		const animate = (timestamp: number) => {
			// Очистка фона (прозрачный, чтобы было видно нижний слой)
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.font = `${fontSize}px monospace`;
			ctx.textBaseline = "top";

			// Обновление символов с дебаунсом (каждые 100мс)
			const shouldUpdateChars = timestamp - lastUpdate > 200;
			if (shouldUpdateChars) {
				lastUpdate = timestamp;
			}

			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					const x = col * columnWidth;
					const y = row * rowHeight;

					// Расстояние до курсора
					const dx = mouseRef.current.x - (x + columnWidth / 2);
					const dy = mouseRef.current.y - (y + rowHeight / 2);
					const distance = Math.sqrt(dx * dx + dy * dy);

					// Радиус эффекта
					const maxDistance = 1000; // Увеличено в 2 раза

					if (distance < maxDistance) {
						// Внутри радиуса
						const influence = 1 - distance / maxDistance;

						// Обновляем символ только если он близко к курсору и прошло время
						if (shouldUpdateChars && Math.random() < 0.1 * influence) {
							const currentRow = grid[row];
							if (currentRow && currentRow[col] !== undefined) {
								currentRow[col] =
									chars[Math.floor(Math.random() * chars.length)] || " ";
							}
						}

						// Цвет: от серого к синему ближе к центру
						const alpha = influence; // Прозрачность зависит от близости

						if (influence > 0.5) {
							// Более прозрачный синий (0.5 вместо 1.0)
							ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.3})`;
						} else {
							// Более прозрачный серый (0.3 вместо 0.8)
							ctx.fillStyle = `rgba(148, 163, 184, ${alpha * 0.3})`;
						}

						const currentRow = grid[row];
						if (currentRow && currentRow[col] !== undefined) {
							ctx.fillText(currentRow[col] || " ", x, y);
						}
					}
				}
			}

			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			window.removeEventListener("mousemove", handleMouseMove);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<canvas
			className="fixed inset-0 z-[-1]"
			ref={canvasRef}
			style={{ pointerEvents: "none" }}
		/>
	);
}
