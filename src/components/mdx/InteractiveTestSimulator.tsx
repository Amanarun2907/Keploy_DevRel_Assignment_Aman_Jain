'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle, Terminal, FileCode, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveTestSimulator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [logs, setLogs] = useState<string[]>([
    '💡 Keploy Interactive CLI Simulator',
    'Click "1. Start Recording" to launch Keploy eBPF hooks...',
  ]);
  const [urlInput, setUrlInput] = useState('https://github.com/keploy/keploy');
  const [testRecorded, setTestRecorded] = useState(false);
  const [activeFileTab, setActiveFileTab] = useState<'terminal' | 'test-1.yaml' | 'mocks.yaml'>('terminal');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // fallback if canvas-confetti fails
    }
  };

  const handleStartRecord = () => {
    setStep(2);
    setActiveFileTab('terminal');
    setLogs([
      '⚡ $ keploy record -c "go run main.go"',
      '🐰 Keploy v2.0-eBPF starting engine...',
      '✅ Intercepted TCP socket on port 8080 (Gin Go app)',
      '✅ Attached eBPF probes for MongoDB (port 27017)',
      '💬 Listening for incoming HTTP requests... (Send an API call below)',
    ]);
  };

  const handleSendApiCall = () => {
    if (!urlInput.trim()) return;
    setStep(3);
    setTestRecorded(true);
    setActiveFileTab('test-1.yaml');
    setLogs((prev) => [
      ...prev,
      '------------------------------------------------',
      `📡 [POST] /url -> Body: {"url": "${urlInput}"}`,
      'mongodb 🟢 INSERT INTO "urls" -> { _id: "650a8f9", short_code: "aB123" }',
      'HTTP 200 OK -> Response: {"short_url": "http://localhost:8080/aB123"}',
      '🎉 SUCCESS: Test case captured -> keploy/tests/test-1.yaml',
      '🎉 SUCCESS: DB Mocks captured -> keploy/mocks/mock-1.yaml',
    ]);
  };

  const handleRunTest = () => {
    setStep(4);
    setActiveFileTab('terminal');
    setLogs((prev) => [
      ...prev,
      '------------------------------------------------',
      '🧪 $ keploy test -c "go run main.go" --delay 5',
      '🔄 Replaying 1 recorded test suite...',
      '  ├─ 🧪 test-1 (POST /url) ... PASSED (12ms)',
      '  └─ 🟢 Mongo DB Mocks matched 100%',
      '------------------------------------------------',
      '📊 TEST SUMMARY:',
      '   Total Tests: 1',
      '   Passed: 1',
      '   Failed: 0',
      '🎉 ALL TEST CASES PASSED WITH KEPLOY!',
    ]);
    triggerConfetti();
  };

  const handleReset = () => {
    setStep(1);
    setTestRecorded(false);
    setActiveFileTab('terminal');
    setLogs([
      '💡 Keploy Interactive CLI Simulator',
      'Click "1. Start Recording" to launch Keploy eBPF hooks...',
    ]);
  };

  return (
    <div id="interactive-cli-simulator" className="my-8 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-950 text-gray-100 overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="px-5 py-3 bg-gray-900 border-b border-gray-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-keploy-400" />
          <span className="text-sm font-bold text-white tracking-wide">
            Interactive Keploy Sandbox Simulator
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-keploy-500/20 text-keploy-400 border border-keploy-500/30">
            Try It Now
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-300 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Simulator Actions Controls */}
      <div className="p-4 bg-gray-900/60 border-b border-gray-800 flex flex-wrap items-center gap-3 text-xs">
        <button
          onClick={handleStartRecord}
          disabled={step > 1}
          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
            step === 1
              ? 'bg-keploy-500 hover:bg-keploy-600 text-white shadow-lg shadow-keploy-500/20'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          1. Start Recording
        </button>

        <div className="flex-1 flex items-center gap-2 min-w-[240px]">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            disabled={step !== 2}
            placeholder="Enter long URL to shorten..."
            className="w-full px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 text-xs focus:outline-none focus:border-keploy-500 disabled:opacity-50"
          />
          <button
            onClick={handleSendApiCall}
            disabled={step !== 2}
            className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              step === 2
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-3 h-3" />
            2. Send Request
          </button>
        </div>

        <button
          onClick={handleRunTest}
          disabled={step !== 3}
          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
            step === 3
              ? 'bg-emerald-500 hover:bg-emerald-400 text-gray-950 shadow-lg shadow-emerald-500/20 font-bold'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          3. Replay Test Suite
        </button>
      </div>

      {/* File Tabs */}
      <div className="flex border-b border-gray-800 bg-gray-900/90 text-xs font-mono px-3 pt-2 gap-2">
        <button
          onClick={() => setActiveFileTab('terminal')}
          className={`px-3 py-1.5 rounded-t-md flex items-center gap-1.5 transition-all ${
            activeFileTab === 'terminal'
              ? 'bg-gray-950 text-keploy-400 font-bold border-t-2 border-keploy-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          CLI Output
        </button>
        {testRecorded && (
          <>
            <button
              onClick={() => setActiveFileTab('test-1.yaml')}
              className={`px-3 py-1.5 rounded-t-md flex items-center gap-1.5 transition-all ${
                activeFileTab === 'test-1.yaml'
                  ? 'bg-gray-950 text-cyan-400 font-bold border-t-2 border-cyan-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              keploy/tests/test-1.yaml
            </button>
            <button
              onClick={() => setActiveFileTab('mocks.yaml')}
              className={`px-3 py-1.5 rounded-t-md flex items-center gap-1.5 transition-all ${
                activeFileTab === 'mocks.yaml'
                  ? 'bg-gray-950 text-emerald-400 font-bold border-t-2 border-emerald-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              keploy/mocks/mock-1.yaml
            </button>
          </>
        )}
      </div>

      {/* Content Viewport */}
      <div className="p-5 font-mono text-xs leading-relaxed min-h-[220px] max-h-[300px] overflow-y-auto bg-gray-950">
        {activeFileTab === 'terminal' && (
          <div className="space-y-1.5">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes('PASSED') || log.includes('SUCCESS')
                    ? 'text-emerald-400 font-semibold'
                    : log.includes('keploy record') || log.includes('keploy test')
                    ? 'text-keploy-400 font-bold'
                    : log.includes('mongodb')
                    ? 'text-cyan-400'
                    : 'text-gray-300'
                }
              >
                {log}
              </div>
            ))}
          </div>
        )}

        {activeFileTab === 'test-1.yaml' && (
          <pre className="text-cyan-300">
{`version: api.keploy.io/v1beta1
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: POST
    proto_major: 1
    proto_minor: 1
    url: /url
    header:
      Content-Type: application/json
    body: '{"url":"${urlInput}"}'
  resp:
    status_code: 200
    header:
      Content-Type: application/json
    body: '{"short_url":"http://localhost:8080/aB123"}'
  objects: []
  assertions:
    noise: []
  created: 1727880000`}
          </pre>
        )}

        {activeFileTab === 'mocks.yaml' && (
          <pre className="text-emerald-300">
{`version: api.keploy.io/v1beta1
kind: Mongo
name: mock-1
spec:
  metadata:
    type: mongo
  requests:
    - header:
        length: 82
        request_id: 12
        response_to: 0
        op_code: 2013
      message:
        flags: 0
        sections:
          - payload:
              body:
                - document:
                    insert: urls
                    documents:
                      - _id: 650a8f9
                        url: "${urlInput}"
                        short_code: aB123
  responses:
    - header:
        length: 45
        op_code: 2013
      message:
        sections:
          - payload:
              body:
                - document:
                    n: 1
                    ok: 1`}
          </pre>
        )}
      </div>

      {step === 4 && (
        <div className="p-3 bg-emerald-950/40 border-t border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 px-5">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Congratulations! You just experienced Keploy's zero-code test generation.</span>
          </div>
          <button
            onClick={handleReset}
            className="text-xs font-bold text-white underline hover:text-emerald-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
