'use client';

import React, { useState } from 'react';

type Phase = '指揮' | '移動' | '射撃' | '突撃' | '白兵戦';

interface LogEntry {
  round: number;
  turnPlayer: string;
  phase: Phase;
  unit: string;
  action: string;
}

export default function HomePage() {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState('プレイヤー1');
  const [currentPhase, setCurrentPhase] = useState<Phase>('指揮');
  const [unit, setUnit] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const phases: Phase[] = ['指揮', '移動', '射撃', '突撃', '白兵戦'];

  const phaseActions: Record<Phase, string[]> = {
    指揮: ['CP獲得', 'アビリティ', '策略'],
    移動: ['通常移動', '全力移動', '退却移動', '静止', 'アビリティ', '策略'],
    射撃: ['射撃', 'アビリティ', '策略'],
    突撃: ['突撃', 'アビリティ', '策略'],
    白兵戦: ['攻撃', 'アビリティ', '策略'],
  };

  const handleAddLog = (action: string) => {
    // if (!unit) return alert('ユニット名を入力してください');
    // if (!unit) {
    //   setUnit('');
    // }

    const newLog: LogEntry = {
      round: currentRound,
      turnPlayer: currentPlayer,
      phase: currentPhase,
      unit,
      action,
    };

    setLogs([...logs, newLog]);
  };

  const handleNextPhase = () => {
    const currentIndex = phases.indexOf(currentPhase);
    if (currentIndex < phases.length - 1) {
      setCurrentPhase(phases[currentIndex + 1]);
    } else {
      // 最後のフェイズ → 次プレイヤー or 次ラウンド
      setCurrentPhase(phases[0]);
      setCurrentPlayer(currentPlayer === 'プレイヤー1' ? 'プレイヤー2' : 'プレイヤー1');
      if (currentPlayer === 'プレイヤー2') {
        setCurrentRound(currentRound + 1);
      }
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Warhammer 40k ログツール</h1>

      <section className="mb-6">
        <div className="mb-2">ラウンド: {currentRound}</div>
        <div className="mb-2">ターン: {currentPlayer}</div>
        <div className="mb-4">フェイズ: {currentPhase}</div>

        <input
          type="text"
          placeholder="ユニット名"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border px-2 py-1 mb-2"
        />

        <div className="mb-4">
          <p className="font-semibold mb-1">行動を選択:</p>
          <div className="flex flex-wrap gap-2">
            {phaseActions[currentPhase].map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleAddLog(action)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleNextPhase} className="bg-green-600 text-white px-4 py-2 rounded">
          次のフェイズへ
        </button>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Log</h2>
        {logs.length === 0 && <p>まだログはありません。</p>}
        <ul className="space-y-2">
          {logs.map((log, index) => (
            <li key={index}>
              <strong>{log.round}R - {log.turnPlayer} - {log.phase}</strong><br />
              ユニット: {log.unit}、--- 行動: {log.action}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
