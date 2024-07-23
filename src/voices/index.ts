import { Client } from "../lib/client";
import type {
	CloneOptions,
	CloneResponse,
	CreateVoice,
	UpdateVoice,
	Voice,
} from "../types";

export default class Voices extends Client {
	async list(): Promise<Voice[]> {
		const response = await this._fetch("/voices");
		return response.json();
	}

	async get(voiceId: string): Promise<Voice> {
		const response = await this._fetch(`/voices/${voiceId}`);
		return response.json();
	}

	async create(voice: CreateVoice): Promise<Voice> {
		const response = await this._fetch("/voices", {
			method: "POST",
			body: JSON.stringify(voice),
		});
		return response.json() as Promise<Voice>;
	}

	async update(id: string, voice: UpdateVoice): Promise<Voice> {
		const response = await this._fetch(`/voices/${id}`, {
			method: "PATCH",
			body: JSON.stringify(voice),
		});
		return response.json() as Promise<Voice>;
	}

	async clone(options: CloneOptions): Promise<CloneResponse> {
		if (options.mode === "url") {
			const response = await this._fetch(
				`/voices/clone/url?link=${options.link}`,
				{
					method: "POST",
				},
			);
			return response.json();
		}

		if (options.mode === "clip") {
			const formData = new FormData();
			formData.append("clip", options.clip);

			const response = await this._fetch("/voices/clone/clip", {
				method: "POST",
				body: formData,
			});
			return response.json();
		}

		throw new Error("Invalid mode for clone()");
	}
}
