/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import openLevel0 from '../levels/level0';
import openLevel1 from '../levels/level1';
import openTestLevel from '../levels/testLevel';
import { useSpriteStore } from './sprite';
// const { characterPosition } = useSpriteStore();

interface Tile {
	tileset: string;
	tileCoord: [number, number];
	impassible: boolean;
	layeredImageSrc?: string;
	layeredImageCoord?: [number, number];
	isCharacter?: boolean;
}

interface JSONTiles {
	rows: { columns: Tile[]; startY?: number; startX?: number; startDir?: string }[];
}

const levels: { [levelName: string]: () => void } = {
	test_level: openTestLevel,
	level0: openLevel0,
	level1: openLevel1,
};

export const useLevelStore = defineStore('levelStore', () => {
	// State:
	const levelMatrix = reactive<Tile[][]>([]);
	const spriteStore = useSpriteStore();

	const openLevel = async (levelName: string, characterPosition: [number, number, string]) => {
		spriteStore.cleanupSprites();
		console.log(levelName);
		const startingPosition = convertToMatrix(
			await fetch(`src/levels/${levelName}.json`)
				.then((response: Response) => response.json())
				.then((json: any) => {
					return json;
				}),
		);
		characterPosition[0] = +startingPosition[0];
		characterPosition[1] = +startingPosition[1];
		characterPosition[2] = `${startingPosition[2]}`;
		levels[levelName]();
	};

	const convertToMatrix = (jsonObj: JSONTiles) => {
		levelMatrix.splice(0, Infinity);
		const startPosition = [0, 0, 's'];
		for (let i = 0; i < jsonObj.rows.length; ++i) {
			const row = jsonObj.rows[i];

			if (i === 0 && row.startY && row.startX && row.startDir) {
				startPosition[0] = Number(jsonObj.rows[0].startY);
				startPosition[1] = Number(jsonObj.rows[0].startX);
				startPosition[2] = String(jsonObj.rows[0].startDir);
				continue;
			}
			levelMatrix.push([]);
			for (let j = 0; j < row.columns.length; ++j) {
				const column = jsonObj.rows[i].columns[j];
				levelMatrix[i - 1].push({
					tileset: column.tileset,
					tileCoord: column.tileCoord,
					impassible: column.impassible,
					layeredImageSrc: column.layeredImageSrc,
					layeredImageCoord: column.layeredImageCoord
						? [+column.layeredImageCoord[0], +column.layeredImageCoord[1]]
						: undefined,
					isCharacter: column.isCharacter,
				});
			}
		}
		return startPosition;
	};

	const isImpassible = (x: number, y: number) => {
		return levelMatrix[x][y].impassible;
	};

	return { levelMatrix, isImpassible, openLevel };
});
