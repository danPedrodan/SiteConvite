import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'
import Button from '../components/Button'
import '../styles/ranking.css'

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const INITIAL = [
  'Sorvete e caminhada',
  'Cinema',
  'Jantar',
  'Açaí',
  'Piquenique',
]

function nowIso() {
  return new Date().toISOString()
}

// transforma string -> objeto com id estável
function toItem(label) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}-${label}`,
    label,
  }
}

function SortableRow({ id, index, label, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li className="listItem" ref={setNodeRef} style={style}>
      <div
        className={`dragCard ${isDragging ? 'dragCard--dragging' : ''}`}
        role="group"
        aria-label={`Item ${index + 1}: ${label}`}
      >
        {/* Handle do drag (melhor pra mobile) */}
        <button
          type="button"
          className="dragHandle"
          aria-label={`Arrastar ${label}`}
          {...attributes}
          {...listeners}
        >
          ☰
        </button>

        <span className="rankPill" aria-hidden="true">
          {index + 1}
        </span>

        <span className="label">{label}</span>

        <button
          className="removeBtn"
          type="button"
          onClick={onRemove}
          aria-label={`Remover ${label}`}
        >
          ✕
        </button>
      </div>
    </li>
  )
}

export default function Ranking() {
  // lista como objetos (id + label)
  const [items, setItems] = useState(() => INITIAL.map(toItem))
  const [newOption, setNewOption] = useState('')

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const endpoint = import.meta.env.VITE_FORM_ENDPOINT
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  const canSend = useMemo(() => items.length > 0 && !sending, [items.length, sending])

  // sensores: mouse + touch (resolve mobile)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } })
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return
    if (active.id === over.id) return

    setItems((prev) => {
      const oldIndex = prev.findIndex((x) => x.id === active.id)
      const newIndex = prev.findIndex((x) => x.id === over.id)
      if (oldIndex < 0 || newIndex < 0) return prev
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  function handleAdd() {
    const v = newOption.trim()
    if (!v) return
    setItems((prev) => [...prev, toItem(v)])
    setNewOption('')
  }

  function handleRemove(id) {
    setItems((prev) => prev.filter((x) => x.id !== id))
  }

  async function handleSubmit() {
    setError('')

    // ✅ validação de env
    if (!endpoint) {
      setError('Faltou configurar o endpoint. No .env: VITE_FORM_ENDPOINT=https://api.web3forms.com/submit')
      return
    }
    if (!accessKey) {
      setError('Faltou configurar a access key. No .env: VITE_WEB3FORMS_ACCESS_KEY=... (da Web3Forms)')
      return
    }

    setSending(true)
    try {
      const rankingArray = items.map((x) => x.label)

      // ✅ payload Web3Forms (access_key é obrigatório)
      const payload = {
        access_key: accessKey,
        subject: 'Ranking do convite 💌',
        from_name: 'Site Convite',
        // "message" costuma aparecer como corpo principal do email
        message: rankingArray.join(' > '),
        // campos extras também são enviados por email
        ranking_json: JSON.stringify(rankingArray),
        timestamp: nowIso(),
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(data?.message || `HTTP ${res.status}`)
      }

      // Web3Forms normalmente responde com { success: true/false, message: ... }
      if (data && data.success === false) {
        throw new Error(data.message || 'Falha ao enviar.')
      }

      setSent(true)
    } catch (e) {
      setError('Não consegui enviar agora 😅 Tenta de novo?')
    } finally {
      setSending(false)
    }
  }

  // ✅ SUCESSO: sem título/subtítulo (não mostra "Agora ordena nossos dates")
  if (sent) {
    return (
      <PageLayout>
        <motion.div
          className="successBox"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          role="status"
          aria-live="polite"
        >
          <h2 className="successTitle">Perfeito! Vou entrar em contato 😄</h2>
          <p className="helper" style={{ margin: 0 }}>
            Pode deixar que eu organizo tudo.
          </p>
        </motion.div>
      </PageLayout>
    )
  }

  return (
    <PageLayout title="Agora ordena nossos dates :)" subtitle="Arrasta pra reorganizar — sem julgamentos 😄">
      <div className="rankingWrap">
        <div className="addRow">
          <label className="visually-hidden" htmlFor="newOption">
            Adicionar nova opção de date
          </label>
          <input
            id="newOption"
            className="input"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Adicionar nova opção…"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
            }}
          />
          <Button variant="ghost" onClick={handleAdd} aria-label="Adicionar opção">
            Adicionar
          </Button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((x) => x.id)} strategy={verticalListSortingStrategy}>
            <ul className="list" aria-label="Lista de ranking">
              {items.map((item, idx) => (
                <SortableRow
                  key={item.id}
                  id={item.id}
                  index={idx}
                  label={item.label}
                  onRemove={() => handleRemove(item.id)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        {error && (
          <motion.div
            className="errorBox"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            role="alert"
          >
            {error}
          </motion.div>
        )}

        <div className="actionsRow">
          <Button onClick={handleSubmit} disabled={!canSend} aria-label="Enviar ranking">
            {sending ? 'Enviando…' : 'Enviar'}
          </Button>
          <p className="helper small">
            {endpoint ? 'Pronto pra enviar 💌' : 'Configure o .env para habilitar o envio.'}
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
