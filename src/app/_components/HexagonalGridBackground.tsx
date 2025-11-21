"use client";

import { useEffect, useRef } from "react";

export function HexagonalGridBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mouseRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
		};
		window.addEventListener("mousemove", handleMouseMove);

		// Параметры шестиугольника
		const hexSize = 30; // Радиус описанной окружности
		const hexHeight = hexSize * 2;
		const hexWidth = Math.sqrt(3) * hexSize;
		const vertDist = hexHeight * 0.75;
		const horizDist = hexWidth;

		const drawHexagon = (x: number, y: number, size: number) => {
			ctx.beginPath();
			for (let i = 0; i < 6; i++) {
				const angle = (Math.PI / 3) * i - Math.PI / 6;
				const px = x + size * Math.cos(angle);
				const py = y + size * Math.sin(angle);
				if (i === 0) {
					ctx.moveTo(px, py);
				} else {
					ctx.lineTo(px, py);
				}
			}
			ctx.closePath();
			ctx.stroke();
		};

		let time = 0;

		const animate = () => {
			time += 0.002; // Медленная анимация времени

			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			const cols = Math.ceil(canvas.width / horizDist) + 2;
			const rows = Math.ceil(canvas.height / vertDist) + 2;

			for (let row = -1; row < rows; row++) {
				for (let col = -1; col < cols; col++) {
					const xOffset = (row % 2) * (hexWidth / 2);
					const x = col * horizDist + xOffset;
					const y = row * vertDist;

					// Расстояние до курсора
					const dx = mouseRef.current.x - x;
					const dy = mouseRef.current.y - y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					// Базовая прозрачность с волновым эффектом (медленные градиенты)
					// Используем координаты и время для создания плавных волн
					const wave =
						Math.sin(x * 0.001 + time) * Math.cos(y * 0.001 + time) * 0.5 + 0.5;
					const baseOpacity = 0.15 + wave * 0.15; // От 0.15 до 0.3

					// Эффект курсора: ослабление сетки (ластик)
					const maxDistance = 1200; // Увеличено в 4 раза
					const influence = Math.max(0, 1 - distance / maxDistance);
					
					// Итоговая прозрачность: плавное ослабление, но не до конца (остается 30%)
					const finalOpacity = baseOpacity * (1 - influence * 0.7);

					ctx.strokeStyle = `rgba(96, 165, 250, ${finalOpacity})`;
					ctx.lineWidth = 1; // Постоянная тонкая линия

					drawHexagon(x, y, hexSize);
				}
			}

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			window.removeEventListener("mousemove", handleMouseMove);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 z-[-2]"
			style={{ pointerEvents: "none" }}
		/>
	);
}
