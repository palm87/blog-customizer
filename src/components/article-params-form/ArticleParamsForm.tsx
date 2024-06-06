import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';

type TChangeArticleFunction = {
	changeArticle: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	changeArticle,
}: TChangeArticleFunction) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	const handleToggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const [formState, setFormState] = useState(defaultArticleState);

	const handleFontFamilyChange = (value: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: value });
	};

	const handleFontSizeChange = (value: OptionType) => {
		setFormState({ ...formState, fontSizeOption: value });
	};

	const handleFontColorChange = (value: OptionType) => {
		setFormState({ ...formState, fontColor: value });
	};

	const handleBackgroundColorChange = (value: OptionType) => {
		setFormState({ ...formState, backgroundColor: value });
	};

	const handleContentWidthChange = (value: OptionType) => {
		setFormState({ ...formState, contentWidth: value });
	};

	function handleFormReset(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setFormState(defaultArticleState);
		changeArticle(defaultArticleState);
	}

	function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		changeArticle(formState);
		setIsFormOpen(!isFormOpen);
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsFormOpen(false);
			}
		}

		if (isFormOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton onClick={handleToggleForm} isFormOpen={isFormOpen} />
			{isFormOpen && (
				<aside
					ref={formRef}
					className={clsx(styles.container, {
						[styles.container_open]: isFormOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={handleFormSubmit}
						onReset={handleFormReset}>
						<Text weight={800} size={31} uppercase>
							Задайте параметры
						</Text>
						<Select
							title='шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
						/>
						<RadioGroup
							title='размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
						<Select
							title='цвет шрифта'
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
						/>
						<Separator />
						<Select
							title='цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
						/>
						<Select
							title='ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
