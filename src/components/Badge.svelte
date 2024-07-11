<script>  

import formatCompactNumber from '../utils/formatCompactNumber'

export let className ='';
export let as = 'span';
export let iconProps={};
export let compProps={};
export let label='';
export let count=false;
export let maxCount = 99;
export let icon=null;
export let iconPosition='left'; 
export let isInteractive = false;
export let isBorderless = false;
export let size = 'md';
export let title='';
export let hasTooltip=false;
export let backgroundColor='';
export let textColor='';
export let borderColor='';
export let level='default';

$: titleAttr = (hasTooltip & count>1000) ? JSON.stringify(count): title

$: levelClass = `druids-badge-${level}`

$: borderColorStyle = borderColor ? `border-color: ${borderColor}`:"";
$: backgroundColorStyle= backgroundColor ? `background-color: ${backgroundColor};`:""
$: textColorStyle= textColor ? `color: ${textColor};`:""

$: interactiveclass = isInteractive ? 'druids-badge-interactive ':'';
$: borderlessClass = isBorderless ? 'druids-badge-borderless ':'';
$: sizeClass = `druids-badge-size-${size}`;
$: countClass = count?'druids-badge-countClass':''

$:countValue = count < maxCount ? formatCompactNumber(count) : `${formatCompactNumber(maxCount)}+`

</script>


{#if typeof as === 'string'}

<!-- customElementWrapper -->
<svelte:element this="{as}" 
{...$$restProps}
style="{backgroundColorStyle} {textColorStyle} {borderColorStyle}" 
title="{titleAttr}"
class='druids-badge-span {interactiveclass} {sizeClass} {borderlessClass} {countClass} {levelClass}  {className}'>
    {#if iconPosition == 'left' }
    <svelte:component this={icon} {...iconProps} />
    {/if}

    {#if count}
        {#if count===true}
        <span class='druids-badge-count'>
            1
        </span>
        {:else}
        <span class='druids-badge-count'>
            {countValue}
        </span>
        {/if}
        {:else}
        {label}
    {/if}


    {#if iconPosition == 'right'}
    <svelte:component this={icon} {...iconProps}/>
    {/if}
</svelte:element>

{:else}

<!-- customComponentWrapper -->
<svelte:component this={as} {...compProps} >
    <span
    style="{backgroundColorStyle} {textColorStyle} {borderColorStyle}" 
    title="{titleAttr}"
    class='druids-badge-span {interactiveclass} {sizeClass} {borderlessClass} {countClass} {levelClass}  {className}'>
    {#if iconPosition == 'left'}
    <svelte:component this={icon} {...iconProps} />
    {/if}

    {#if count}
        {#if count===true}
        <span class='druids-badge-count'>
            1
        </span>
        {:else}
        <span class='druids-badge-count'>
            {countValue}
        </span>
        {/if}
        {:else}
        {label}
    {/if}


    {#if iconPosition == 'right'}
    <svelte:component this={icon} {...iconProps}/>
    {/if}
    </span>
</svelte:component>


{/if}


<style>
    :global(:root){
        --ui-background:#FFFFFF;
        --ui-background-secondary:#F9FAFB;
        --ui-background-elevated:#FFFFFF;
        --ui-background-shade:#464B59;
        --ui-border:#E2E5ED;
        --ui-border-elevated:#F9FAFB;
        --ui-placeholder:#EDF0F4;
        --ui-ai-background-primary:#F2ECFC;
        --ui-ai-background-secondary:#EAF6FC;


        --ui-text:#202F38;
        --ui-text-secondary:#656F75;
        --ui-text-tertiary:#8D9599;
        --ui-text-disabled:#ACB2B5;
        --ui-text-knockout:#FFFFFF;
        --ui-icon:#697379;
        --ui-icon-secondary:#979EA2;
        --ui-ai-primary:#8000FF;


        --ui-interaction-primary:#006BC2;
        --ui-interaction-primary-contrast:#0953BF;
        --ui-interaction-secondary:#EAF6FC;
        --ui-interaction-secondary-contrast:#D4ECF9;
        --ui-interaction-callout:#FF0099;
        --ui-interaction-callout-contrast:#FFF2FA;



        --ui-status-danger:#EB364B;
        --ui-status-danger-contrast:#BC2B3C;
        --ui-status-danger-soft:#FDEBED;
        --ui-status-warning:#F99D02;
        --ui-status-warning-contrast:#F27C00;
        --ui-status-warning-soft:#FFF6E3;
        --ui-status-success:#41C464;
        --ui-status-success-contrast:#2A7E41;
        --ui-status-success-soft:#ECF9EF;
        --ui-status-other:#828BA4;
        --ui-status-other-contrast:#585F70;
        --ui-status-other-soft:#EFF1F5;


    }

    .druids-badge-span{
        padding: 0.25rem 0.75rem;
        width: auto;
        display: inline-flex;
        gap: 4px;
        justify-content: center;
        align-items: center;
        border-radius: 32px;
        border: solid 1px;
        border-color: var(--ui-border);
        color: var(--ui-text);
    }


    .druids-badge-interactive:hover.druids-badge-span{
        background-color: var(--ui-background-secondary);
    }

    .druids-badge-interactive:hover.druids-badge-countClass{
        background-color: var(--ui-interaction-secondary-contrast);
    }

    .druids-badge-borderless.druids-badge-span{
        border: none;
    }
    .druids-badge-span.druids-badge-countClass{
        border: none;
        background-color: var(--ui-background-secondary);

    }
    .druids-badge-count{
        font-weight: 600;
        padding: 1px;
    }
    .druids-badge-icon{
        width: 1em ;
    }
    
    .druids-badge-size-xs{
        font-size: x-small;
    }
    .druids-badge-size-sm{
        font-size: small;
    }
    .druids-badge-size-md{
        font-size: medium;
    }
    .druids-badge-size-lg{
        font-size: larger;
    }

    .druids-badge-span.druids-badge-default{
        border-color: var(--ui-border);
        color: var(--ui-text);
    }

    .druids-badge-span.druids-badge-warning{
        border: none !important;
        background-color: var(--ui-status-warning-soft);
        color: var(--ui-status-warning-contrast);
    }

    .druids-badge-span.druids-badge-danger{
        border: none !important;
        background-color: var(--ui-status-danger-soft);
        color: var(--ui-status-danger-contrast);
    }


</style>