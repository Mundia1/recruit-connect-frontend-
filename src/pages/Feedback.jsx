import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';

const faces = [
  { label: "Very Dissatisfied", emoji: "😠", value: 1 },
  { label: "Dissatisfied", emoji: "😞", value: 2 },
  { label: "Neutral", emoji: "😐", value: 3 },
  { label: "Satisfied", emoji: "😊", value: 4 },
  { label: "Very Satisfied", emoji: "😍", value: 5 }
];

const Feedback = () => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';

const faces = [
  { label: "Very Dissatisfied", emoji: "😠", value: 1 },
  { label: "Dissatisfied", emoji: "😞", value: 2 },
  { label: "Neutral", emoji: "😐", value: 3 },
  { label: "Satisfied", emoji: "😊", value: 4 },
  { label: "Very Satisfied", emoji: "😍", value: 5 }
];

const Feedback = () => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';

const faces = [
  { label: "Very Dissatisfied", emoji: "😠", value: 1 },
  { label: "Dissatisfied", emoji: "😞", value: 2 },
  { label: "Neutral", emoji: "😐", value: 3 },
  { label: "Satisfied", emoji: "😊", value: 4 },
  { label: "Very Satisfied", emoji: "😍", value: 5 }
];

const Feedback = () => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comment });

    setRating(null);
    setComment("");
  };